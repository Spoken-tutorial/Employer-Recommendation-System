from rest_framework import serializers
from events.models import Event
from spoken.models import SpokenState, SpokenCity,Profile, SpokenStudent, StudentBatch, StudentMaster, TestAttendance
from accounts.serializers import UserSerializer
from datetime import datetime
from .mixins import DateFormatterMixin
from django.db.models import Max, Prefetch, Count
from django.shortcuts import get_object_or_404
from .models import *
from utilities.serializers import LocationSerializer



class CompanyManagerSerializer(serializers.ModelSerializer):
        user = UserSerializer()
        class Meta:
            model = CompanyManagers
            fields = ['id', 'user', 'company']

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'

class JobTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobType
        fields = ['jobtype']


class CompanySerializer1(serializers.ModelSerializer):
    managers = serializers.SerializerMethodField()
    domain = serializers.SerializerMethodField()
    class Meta:
        model = Company
        fields = ['id', 'name','date_created', 'is_agency', 'domain','managers']

    def get_managers(self, obj):
         managers = obj.companymanagers_set.all()
         manager_data = []
         for manager in managers:
             phone=''
             if hasattr(manager.user, 'user_profile'): 
                phone = manager.user.user_profile[0].phone if manager.user.user_profile else None
             manager_data.append({'name': manager.user.first_name, 'email': manager.user.email, 'phone': phone})
         return manager_data
    
    def get_domain(self, obj):
        return [domain.name for domain in obj.domain.all()]

class CustomDegreeField(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.name
    def to_internal_value(self, data):
        return get_object_or_404(Degree, id=data)
    
class CustomDisciplineField(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.name
    def to_internal_value(self, data):
        return get_object_or_404(Discipline, id=data)

class JobSerializer(serializers.ModelSerializer, DateFormatterMixin):
    job_state = serializers.SerializerMethodField()
    city_state = serializers.SerializerMethodField()
    domain = DomainSerializer()
    job_type = JobTypeSerializer()
    company = serializers.CharField(source='company.name')
    created = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    last_app_date = serializers.SerializerMethodField()
    degree = CustomDegreeField(many=True)
    # discipline = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = '__all__'
        fields = ['id', 'designation', 'job_state', 'city_state', 'salary_range_min', 'salary_range_max', 'created',
                  'updated', 'requirements',  'key_job_responsibilities', 'last_app_date', 'num_vacancies',
                   'domain', 'job_type', 'company', 'skills', 'degree', 'discipline', 'get_applicants_count' ]
        date_fields = ['last_app_date']
        
    def get_job_state(self, obj):
        try:
            return SpokenState.objects.get(id=obj.state_job).name
        except:
            return None
    
    def get_city_state(self, obj):
        try:
            return SpokenCity.objects.get(id=obj.city_job).name
        except:
            return None
    
    def get_created(self, obj):
        return datetime.strftime(obj.date_created, "%d %B %Y %H:%M:%S")
    
    def get_updated(self, obj):
        return datetime.strftime(obj.date_updated, "%d %B %Y %H:%M:%S")
    
    def get_last_app_date(self, obj):
        return datetime.strftime(obj.last_app_date, "%d %B %Y") if obj.last_app_date else None
        

#################################### Serializers V2 ####################################
from django.contrib.auth.models import User
from accounts.serializers import ProfileSerializer
from accounts.models import Profile as JRSProfile
from django.db import transaction, IntegrityError
from utilities.models import State, City

#--------------------------------------Common--------------------------------------------------
class DateFormatterMixin:
    """
    Mixin for formatting date fields in a model. To use this mixin, you need to define
    a list of date field names in the Meta class of your serializer. The mixin will
    automatically create formatted versions of these date fields.

    Example:
    class YourSerializer(DateFormatterMixin, serializers.ModelSerializer):
        class Meta:
            model = YourModel
            fields = ['field1', 'field2', '...']
            date_fields = ['start_date', 'end_date']  # List of date fields to be formatted

    This will add 'formatted_start_date' and 'formatted_end_date' to your serializer
    with the dates formatted as 'dd MMM YYYY'.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.date_fields:
            formatted_field = f'formatted_{field}'
            method_name = f'get_{formatted_field}'
            self.fields[formatted_field] = serializers.SerializerMethodField(method_name=f'{method_name}')
            setattr(self, method_name, self.create_date_formatter(field))


    def create_date_formatter(self, field):
        def _date_formatter(obj):
            date = getattr(obj, field, None)
            return date.strftime('%d %b %Y ') if date else None
        return _date_formatter


class FormattedDateTimeField(serializers.DateTimeField):
    def to_representation(self, value):
        if value is not None:
            return value.strftime('%Y-%m-%d %H:%M:%S')
        return None
#--------------------------------------Misc--------------------------------------------------
class EventSerializer(DateFormatterMixin, serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','name', 'type', 'status', 'description']
        date_fields = ['start_date', 'end_date']

#--------------------------------------Student--------------------------------------------------  
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'desc']

class CustomSkillField(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.name
    def to_internal_value(self, data):
        return get_object_or_404(Skill, id=data)

class StudentDetailSerializer(DateFormatterMixin, serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    address = serializers.SerializerMethodField(read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    contact = serializers.SerializerMethodField(read_only=True)
    gender = serializers.SerializerMethodField(read_only=True)
    test_details = serializers.SerializerMethodField(read_only=True)
    skills = CustomSkillField(many=True)
    projects = ProjectSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        student_master = StudentMaster.objects.filter(student_id=instance.spk_student_id).select_related('batch', 'batch__academic',
                                                                                                     'batch__academic__state', 'batch__academic__city').first()
        if student_master:
            data['institute'] = student_master.batch.academic.institution_name
            data['state'] = student_master.batch.academic.state.name
            data['city'] = student_master.batch.academic.city.name
        else:
            data['institute'] = None
            data['state'] = None
            data['city'] = None
        return data
    
    def update(self, instance, validated_data):
        projects_data = validated_data.pop('projects', [])
        instance = super().update(instance, validated_data)
        instance.projects.clear()
        for project_data in projects_data:
            project, created = Project.objects.get_or_create(**project_data)
            instance.projects.add(project)
        instance.save()
        return instance
    
    class Meta:
        model = Student
        fields = ['name', 'address', 'email', 'alternate_email','contact', 'gender',  'test_details', 'skills',
                  'about', 'projects', 'github', 'linkedin', 'resume', 'date_created', 'date_updated', 'certifications',
                   'notified_date', 'profile_update_date', 'joining_immediate', 'avail_for_intern',
                    'willing_to_relocate', 'phone', 'state', 'city']
        date_fields = ['date_created', 'date_updated', 'notified_date', 'profile_update_date']

    def get_profile(self, obj):
        return Profile.objects.filter(user_id=obj.spk_usr_id).first()

    def get_address(self, obj):
        profile = self.get_profile(obj)
        return profile.address if profile else None
        
    def get_contact(self, obj):
        profile = self.get_profile(obj)
        return profile.phone if profile else None
    
    def get_gender(self, obj):
        spoken_student = SpokenStudent.objects.filter(user_id=obj.spk_usr_id).first()
        return spoken_student.gender if spoken_student else None
    
    def get_test_details(self, obj):
        ta = TestAttendance.objects.filter(student_id=obj.spk_student_id).values('test__foss__foss').annotate(
            grade=Max('mdlgrade'), test_date=Max('test__tdate')
        )
        formatted_ta = []
        for item in ta:
            formatted_ta.append({
                'foss': item['test__foss__foss'],
                'grade': item['grade'],
                'test_date': item['test_date'].strftime('%d %b %Y ')
            })
        return formatted_ta
    

class StudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    contact = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'contact']

    def get_profile(self, obj):
        return Profile.objects.filter(user_id=obj.spk_usr_id).first()
    
    def get_contact(self, obj):
        profile = self.get_profile(obj)
        return profile.phone if profile else None

class StudentProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    projects = ProjectSerializer(many=True)
    education_details  = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['name', 'email', 'phone', 'address', 'alternate_email',
                  'about', 'joining_immediate', 'avail_for_intern', 'willing_to_relocate',
                   'skills', 'certifications', 'linkedin' , 'github', 'resume',
                   'projects', 'education_details' ]
    
    def get_spoken_user(self, obj):
        try:
            return SpokenUser.objects.get(id=obj.spk_usr_id)
        except SpokenUser.DoesNotExist:
            return None
    
    def get_name(self, obj):
        spk_user = self.get_spoken_user(obj)
        return f"{spk_user.first_name} {spk_user.last_name}" if spk_user else None
    
    def get_email(self, obj):
        spk_user = self.get_spoken_user(obj)
        return spk_user.email if spk_user else None
        
    
    def get_education_details(self, obj):
        try:
            student_master = StudentMaster.objects.select_related('batch').select_related(
                'batch__academic').select_related(
                'batch__department').get(student_id = obj.spk_student_id)
            batch = student_master.batch
            return {
                "academic" : batch.academic.institution_name,
                "department" : batch.department.name
            }
        except StudentMaster.DoesNotExist:
            return None
        
    def update(self, instance, validated_data):
        projects_data = validated_data.pop('projects', None)
        if projects_data is not None:
            instance.projects.clear()
            for project_data in projects_data:
                project = Project.objects.create(**project_data)
                instance.projects.add(project)
        instance = super().update(instance, validated_data)
        return instance


class StudentDahboardJobSerializier(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name')
    class Meta:
        model = JobDetail
        fields = ['designation', 'company_name']

class StudentAppliedJobSerializer(serializers.ModelSerializer):
    job_detail = StudentDahboardJobSerializier()
    applied_on_date = serializers.SerializerMethodField()
    class Meta:
        model = JobShortlist
        fields = ['job_detail', 'date_created', 'status', 'applied_on_date' ]

    def get_formatted_last_app_date(self, obj):
        obj.last_app_date.strftime('%Y-%m-%d')

    def get_applied_on_date(self, obj):
        return obj.date_created.strftime('%Y-%m-%d')

class StudentRecommendedJobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name')
    formatted_last_app_date = serializers.SerializerMethodField()
    class Meta:
        model = JobDetail
        fields = ['company_name', 'designation', 'description', 'last_application_date', 'job_type', 'formatted_last_app_date' ]

    def get_formatted_last_app_date(self, obj):
        if obj.last_application_date:
            return obj.last_application_date.strftime('%Y-%m-%d')
        return None

#--------------------------------------Job--------------------------------------------------
class JobFossSerializer(serializers.Serializer):   
    class Meta:
        model = JobFoss
        fields = ['job', 'foss', 'type', 'grade']
        read_only_fields = ['job']  # Define read-only fields here

class JobRegistrationSerializer(serializers.ModelSerializer):
    jobfoss = JobFossSerializer(many=True, required=False)
    
    class Meta:
        model = JobDetail
        fields = ['designation', 'company', 'state_job','city_job','skills','domain', 'salary_range_min',
                  'salary_range_max', 'job_type', 'description' , 'requirements', 'key_job_responsibilities','gender',
                     'last_app_date', 'num_vacancies','degree','discipline', "jobfoss" ]

    def to_internal_value(self, data):
        mappings = {
            'state_job': State,
            'city_job': City,
            'job_type': JobType,
            'domain': Domain,
        }

        for field, modelClass in mappings.items():
            value = data.get(field)
            if isinstance(value, modelClass):
                data[field] = value.id

        for field in ['skills', 'degree', 'discipline']:
            value = data.get(field)
            if value:
                try:
                    data[field] = [x.id for x in value]
                except Exception as e:
                    print(e)
        return super().to_internal_value(data)  
        
class JobDetailListSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source='company.name')
    date_created = serializers.SerializerMethodField()
    last_application_date = serializers.SerializerMethodField()
    applicants_count = serializers.SerializerMethodField()

    def get_applicants_count(self, obj):
        # return obj.get_total_applicants()
        return obj.applicants
    
    
    def get_date_created(self, obj):
        return obj.date_created.strftime("%d %B %Y")
    
    def get_last_application_date(self, obj):
        return obj.last_application_date.strftime("%d %B %Y ")
    
    class Meta:
        model = JobDetail
        fields = ['id', 'designation', 'date_created', 'last_application_date', 'applicants_count', 'company', 'status']


    

class StudentFilterYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFilterYear
        fields = ['job', 'year']

class JobDetailSerializer(serializers.ModelSerializer):
    date_created = FormattedDateTimeField()
    date_updated = FormattedDateTimeField()
    filter_year = serializers.SerializerMethodField()
    mandatory_foss = serializers.SerializerMethodField()
    optional_foss = serializers.SerializerMethodField()
    filter_location = serializers.SerializerMethodField()

    filter_year_w = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    mandatory_foss_w = serializers.ListField(child=serializers.IntegerField(), required=True, write_only=True)
    optional_foss_w = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    filter_location_w = serializers.ListField(child=serializers.DictField(child=serializers.IntegerField()), write_only=True, required=False)
    class Meta:
        model = JobDetail
        fields = ['designation', 'state_job', 'city_job', 'skills', 'domain', 'salary_range_min',
                    'salary_range_max', 'job_type', 'status', 'description', 
                    'requirements', 'key_job_responsibilities', 'gender',
                    'last_app_date', 'num_vacancies', 'degree', 'discipline', 'date_created',
                    'date_updated', 'filter_year', 'mandatory_foss', 'optional_foss', 'filter_location',
                    'filter_year_w', 'mandatory_foss_w', 'optional_foss_w', 'filter_location_w' ]
    
    def get_filter_year(self, obj):
        return StudentFilterYear.objects.filter(job=obj).values_list('year', flat=True)
    
    def get_mandatory_foss(self, obj):
        return StudentFilterFoss.objects.filter(job=obj, type="Mandatory").values_list('foss', flat=True)
    
    def get_optional_foss(self, obj):
        return StudentFilterFoss.objects.filter(job=obj, type="Optional").values_list('foss', flat=True)
    
    def get_filter_location(self, obj):
        return StudentFilterLocation.objects.filter(job=obj).values('state','city')
    
    def update_student_filter_year(self, instance, filter_year):
        try:
                existing_years = StudentFilterYear.objects.filter(job=instance)
                for item in existing_years:
                    if item.year not in filter_year:
                        item.delete()
                    else:
                        filter_year.remove(item.year)
                year_data = [StudentFilterYear(job=instance, year=year) for year in filter_year]
                StudentFilterYear.objects.bulk_create(year_data)
        except IntegrityError:
            pass
    
    def update_student_filter_foss(self, instance, foss_list, foss_type):
        try:
            data = StudentFilterFoss.objects.filter(job=instance, type=foss_type)
            for item in data:
                if item.foss not in foss_list:
                    item.delete()
                else:
                    foss_list.remove(item.foss)
            fosses_data = [StudentFilterFoss(job=instance, foss_id=foss, type=foss_type) for foss in foss_list]
            StudentFilterFoss.objects.bulk_create(fosses_data)
        except IntegrityError as e:
            pass

    def update_student_filter_location(self, instance, filter_location):
        city_list = [location['city'] for location in filter_location]
        existing_locations = StudentFilterLocation.objects.filter(job=instance)
        for item in existing_locations:
            if item.city not in  city_list:
                item.delete()
            else:
                for data in filter_location:
                    if data.city ==  item.city:
                        filter_location.pop(data)
        
        filter_location_data = [
            StudentFilterLocation(job=instance, state_id=loc.get('state'), city_id=loc.get('city', None)) 
            if loc.get('city') != 0 else 
            StudentFilterLocation(job=instance, state_id=loc.get('state'), city=None)
            for loc in filter_location
        ]
        for item in filter_location_data:
            try:
                item.save()
            except:
                pass
        # StudentFilterLocation.objects.bulk_create(filter_location_data)
        
        
        
    
    def update_student_filter(self, instance, validated_data):
        filter_year = validated_data.pop('filter_year_w', [])
        mandatory_foss = validated_data.pop('mandatory_foss_w', [])
        optional_foss = validated_data.pop('optional_foss_w', [])
        filter_location = validated_data.pop('filter_location_w', [])
        
        try:
            if filter_year:
                year_data = [StudentFilterYear(job=instance, year=year) for year in filter_year]
                StudentFilterYear.objects.bulk_create(year_data)
        except IntegrityError:
            pass
        try:
            if mandatory_foss:
                mandatory_fosses_data = [StudentFilterFoss(job=instance, foss_id=foss, type='Mandatory') for foss in mandatory_foss]
                StudentFilterFoss.objects.bulk_create(mandatory_fosses_data)
        except IntegrityError:
            pass
        try:
            if optional_foss:
                data = StudentFilterFoss.objects.filter(job=instance)
                for item in data:
                    if item.foss not in optional_foss:
                        item.delete()
                    else:
                        optional_foss.remove(item.foss)
                optional_fosses_data = [StudentFilterFoss(job=instance, foss_id=foss, type='Optional') for foss in optional_foss]
                StudentFilterFoss.objects.bulk_create(optional_fosses_data)
        except IntegrityError:
            pass
        try:
            if filter_location:
                filter_location_data = [
                    StudentFilterLocation(job=instance, state_id=loc.get('state'), city_id=loc.get('city', None)) 
                    if loc.get('city') != 0 else 
                    StudentFilterLocation(job=instance, state_id=loc.get('state'), city=None)
                    for loc in filter_location
                ]
                StudentFilterLocation.objects.bulk_create(filter_location_data)
        except IntegrityError:
            pass

    def update(self, instance, validated_data):
        keys = list(validated_data.keys())
        filter_year = validated_data.pop('filter_year_w', [])
        mandatory_foss = validated_data.pop('mandatory_foss_w', [])
        optional_foss = validated_data.pop('optional_foss_w', [])
        filter_location = validated_data.pop('filter_location_w', [])

        instance = super().update(instance, validated_data)
        
        if "filter_year_w" in keys:
            self.update_student_filter_year(instance, filter_year)
        if "mandatory_foss_w" in keys:
            self.update_student_filter_foss(instance, mandatory_foss, "Mandatory")
        if "optional_foss_w" in keys:
            self.update_student_filter_foss(instance, optional_foss, "Optional")
        if "filter_location_w" in keys:
            self.update_student_filter_location(instance, filter_location)
        return instance


class JobDetailCreateSerializer(serializers.ModelSerializer):
    filter_year = serializers.ListField(child=serializers.IntegerField(), required=False)
    filter_mandatory_skills = serializers.ListField(child=serializers.IntegerField())
    filter_optional_skills = serializers.ListField(child=serializers.IntegerField())
    filter_state = serializers.ListField(child=serializers.IntegerField(), required=False)
    filter_city = serializers.ListField(child=serializers.IntegerField(), required=False)

    REQUIRED_FIELDS = ['designation', 'state_job', 'city_job', 'job_type',
                  'domain', 'salary_range_min', 'salary_range_max',
                'description', 'requirements', 'key_job_responsibilities',
                'last_app_date', 'num_vacancies', 
                'filter_year', 'filter_mandatory_skills', 'filter_optional_skills',
                # 'filter_degree' ,'filter_discipline', #ToDo for degree, discipline
                'filter_state', 'filter_city'
                  ]

    def validate(self, data):
        status = data.get('status', 'draft')
        if status == 'draft':
            return data
        else:
            for field in self.REQUIRED_FIELDS:
                if not data.get(field):
                    raise serializers.ValidationError('Please fill all the fields to submit the job application.')
        return data
    
    class Meta:
        model = JobDetail
        fields = ['designation', 'state_job', 'city_job', 'job_type',
                  'domain', 'salary_range_min', 'salary_range_max',
                'description', 'requirements', 'key_job_responsibilities',
                'last_app_date', 'num_vacancies', 
                'filter_year', 'filter_mandatory_skills', 'filter_optional_skills',
                # 'filter_degree' ,'filter_discipline', #ToDo for degree, discipline
                'filter_state', 'filter_city','status'
                  ]
        extra_kwargs = {
            'designation' : {'required': False}
        }
    def create(self, validated_data):
        try:
            filter_year = validated_data.pop('filter_year', [])
            filter_mandatory_skills = validated_data.pop('filter_mandatory_skills', [])
            filter_optional_skills = validated_data.pop('filter_optional_skills', [])
            # filter_degree = validated_data.pop('filter_degree', [])
            # filter_discipline = validated_data.pop('filter_discipline', [])
            filter_state = validated_data.pop('filter_state', [])
            filter_city = validated_data.pop('filter_city', [])
            
            with transaction.atomic():
                instance = super().create(validated_data)
                year_data = [JobFilterYear(job=instance, year=year) for  year in filter_year]
                JobFilterYear.objects.bulk_create(year_data)
                mandatory_skills_data = [ JobFoss(job=instance, foss_id=foss, type='Mandatory') for foss in filter_mandatory_skills]
                JobFoss.objects.bulk_create(mandatory_skills_data)
                optional_skills_data = [ JobFoss(job=instance, foss_id=foss, type='Optional') for foss in filter_optional_skills]
                JobFoss.objects.bulk_create(optional_skills_data)
                cities = City.objects.filter(id__in=filter_city).values_list('id', 'state_id')
                location_data = [JobFilterLocation(job=instance, city_id=id, state_id=state) for id, state in cities]
                saved_state_ids = [x[1] for x in cities]
                for state in filter_state:
                    if state not in saved_state_ids:
                        location_data.append(JobFilterLocation(job=instance, state_id=state, city=None))
                JobFilterLocation.objects.bulk_create(location_data)
                return instance
        except Exception as e:
            print(e)
        return None

#--------------------------------------Company--------------------------------------------------
class CompanyDataSerializer(serializers.ModelSerializer):
    domain = serializers.SerializerMethodField()
    num_jobs = serializers.IntegerField(read_only=True)
    class Meta:
        model = Company
        fields = ['id', 'name', 'domain', 'logo', 'description', 'num_jobs']

    def get_domain(self, obj):
        return [domain.name for domain in obj.domain.all()]    
    

class CompanyRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer(write_only=True)
    job = JobRegistrationSerializer(write_only=True)
    filter_year = serializers.ListField(child=serializers.IntegerField(), required=False)
    mandatory_foss = serializers.ListField(child=serializers.IntegerField(), required=True, write_only=True)
    optional_foss = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    filter_location = serializers.ListField(child=serializers.DictField(child=serializers.IntegerField()), write_only=True, required=False)
    class Meta:
        model = Company
        fields = ['name', 'website', 'is_agency','user','job', 'filter_year', 'mandatory_foss', 'optional_foss', 
                  'filter_location']

    def create_user(self, user_data):
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        return user_serializer.save()
    
    def create_job(self, job_data, company, user):
        job_serializer = JobRegistrationSerializer(data=job_data)
        job_serializer.is_valid(raise_exception=True)
        job = job_serializer.save()
        job.company = company
        job.added_by = user
        job.save()
        return job
    
    def create_filters(self, job, filter_year, mandatory_foss, optional_foss, filter_location):
        if filter_year:
            year_data = [StudentFilterYear(job=job, year=year) for year in filter_year]
            StudentFilterYear.objects.bulk_create(year_data)
        if mandatory_foss:
            mandatory_fosses_data = [StudentFilterFoss(job=job, foss_id=foss, type='Mandatory') for foss in mandatory_foss]
            StudentFilterFoss.objects.bulk_create(mandatory_fosses_data)
        if optional_foss:
            optional_fosses_data = [StudentFilterFoss(job=job, foss_id=foss, type='Optional') for foss in optional_foss]
            StudentFilterFoss.objects.bulk_create(optional_fosses_data)
        if filter_location:
            filter_location_data = [
                StudentFilterLocation(job=job, state_id=loc.get('state'), city_id=loc.get('city', None)) 
                if loc.get('city') != 0 else 
                StudentFilterLocation(job=job, state_id=loc.get('state'), city=None)
                for loc in filter_location
            ]
            StudentFilterLocation.objects.bulk_create(filter_location_data)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        job_data = validated_data.pop('job')
        filter_year = validated_data.pop('filter_year', [])
        mandatory_foss = validated_data.pop('mandatory_foss', [])
        optional_foss = validated_data.pop('optional_foss', [])
        filter_location = validated_data.pop('filter_location', [])

        with transaction.atomic():
            user = self.create_user(user_data)
            validated_data['added_by_id'] = user.id
            company = Company.objects.create(**validated_data)
            cm = CompanyManagers.objects.create(user=user, company=company, group_id=3)
            job = self.create_job(job_data, company, user=user)
            degree = job_data.pop('degree', [])
            discipline = job_data.pop('discipline', [])
            job.degree.set(degree)
            job.discipline.set(discipline)
            self.create_filters(job, filter_year, mandatory_foss, optional_foss, filter_location)
            return company
        
class CompanyUpdateSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    class Meta:
        model = Company
        fields = ['name', 'website', 'location', 'description',
                  'domain', 'company_size' ]
        
    def update(self, instance, validated_data):
        location = validated_data.pop('location', None)
        if location : 
            if instance.location:
                location_serializer = LocationSerializer(instance.location,data=location, partial=True )
            else:
                location_serializer = LocationSerializer(data=location )
            location_serializer.is_valid(raise_exception=True)
            location_serializer.save()
        instance = super().update(instance, validated_data)
        return instance
    
        


# class StudentDashboardSerializier(serializers.ModelSerializer):
#     class Meta:
#         pass
