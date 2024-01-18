from rest_framework import serializers
from .models import Company, Job, CompanyManagers, Domain, JobType, Student, Project, Skill, Degree, Discipline
from events.models import Event
from spoken.models import SpokenState, SpokenCity, Profile, SpokenStudent, StudentBatch, StudentMaster, TestAttendance
from accounts.serializers import UserSerializer
from datetime import datetime
from .mixins import DateFormatterMixin
from django.db.models import Max
from django.shortcuts import get_object_or_404


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


class CompanySerializer(serializers.ModelSerializer):
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
                   'domain', 'job_type', 'company', 'skills', 'degree', 'discipline', 'job_foss', 'get_applicants_count' ]
        date_fields = ['last_app_date']
        
    def get_job_state(self, obj):
        try:
            return SpokenState.objects.get(id=obj.state_job).name
        except:
            return None
    
    def get_city_state(self, obj):
        print(f"\033[95m obj.city_job : {obj.city_job} \033[0m")
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
        

# class CompanyRegSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         # fields = ['id', 'name', 'website', 'date_created', 'is_agency', 'domain', 'managers']
#         fields = ['id', 'name', 'website', 'date_created']
#         extra_kwargs = {'id': {'read_only': True}, 'date_created': {'read_only': True}}
    

#----------------------------------- Serializers V2 -----------------------------------#
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

class EventSerializer(DateFormatterMixin, serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','name', 'type', 'status', 'description']
        date_fields = ['start_date', 'end_date']

class CompanyDataSerializer(serializers.ModelSerializer):
    domain = serializers.SerializerMethodField()
    num_jobs = serializers.IntegerField(read_only=True)
    class Meta:
        model = Company
        fields = ['id', 'name', 'domain', 'logo', 'description', 'num_jobs']

    def get_domain(self, obj):
        return [domain.name for domain in obj.domain.all()]    
    
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

