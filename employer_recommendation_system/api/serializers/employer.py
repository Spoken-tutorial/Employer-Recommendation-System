from django.contrib.auth.models import User
from django.db import transaction

from rest_framework import serializers

from emp.models import Employer, Job, Company, JobShortlist, Domain, JobType
from filters.models import *
from api.serializers.auth import UserSerializer

from api.utils.auth import generate_password

from spoken.models import *

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = [ 'phone' ]

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'id',
            'name',
            'emp_name',
            'emp_contact',
            'state_c',
            'city_c',
            'address',
            'email',
            'logo',
            'description',
            'domain',
            'company_size',
            'website',
            'status',
            'added_by',
            'slug',
            'rating',
        ]
    read_only_fields = ['id', 'added_by', 'slug', 'status', 'rating']

class JobCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Job
        fields = [
            'designation',
            'salary_range_min',
            'salary_range_max',
            'last_app_date',
            'num_vacancies',

            'gender',

            'description',
            'requirements',
            'key_job_responsibilities',

            'domain',
            'state_of_job',
            'city_of_job',
            'job_type',
            'company',

            'courses',
            'course_groups',
            'degrees',
            'disciplines',
            'graduation_years',
            'institute_types',
            'states',
            'cities',

            'job_status',
            
        ]

class JobListEligibilitySerializer(serializers.ModelSerializer):
    last_app_date_human = serializers.SerializerMethodField()
    num_applicants = serializers.SerializerMethodField()
    courses = serializers.StringRelatedField(many=True)
    course_groups = serializers.StringRelatedField(many=True)
    degrees = serializers.StringRelatedField(many=True)
    disciplines = serializers.StringRelatedField(many=True)
    graduation_years = serializers.StringRelatedField(many=True)
    institute_types = serializers.StringRelatedField(many=True)
    states = serializers.StringRelatedField(many=True)
    cities = serializers.StringRelatedField(many=True)

    class Meta:
        model = Job
        fields = ['id', 'designation', 'job_status', 'last_app_date_human', 'num_applicants',
                  'courses', 'course_groups', 'degrees', 'disciplines', 'graduation_years', 
                  'institute_types', 'states', 'cities']

    def get_num_applicants(self, obj):
        return JobShortlist.objects.filter(job=obj).count()
    
    def get_last_app_date_human(self, obj):
        print(f"\033[95m last_app_date_human \033[0m")
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None
      
class JobListSerializer(serializers.ModelSerializer):
    last_app_date_human = serializers.SerializerMethodField()
    num_applicants = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['id', 'designation', 'job_status', 'last_app_date_human', 'num_applicants']

    def get_last_app_date_human(self, obj):
        print(f"\033[95m last_app_date_human \033[0m")
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None
        
    def get_num_applicants(self, obj):
        return JobShortlist.objects.filter(job=obj).count()


class JobDisplaySerializer(serializers.ModelSerializer):
    last_app_date_human = serializers.SerializerMethodField()
    num_applicants = serializers.SerializerMethodField()
    domain = serializers.StringRelatedField() 
    state_of_job = serializers.StringRelatedField()
    city_of_job = serializers.StringRelatedField()
    job_type = serializers.StringRelatedField()
    company = serializers.StringRelatedField()
    courses = serializers.StringRelatedField(many=True)
    course_groups = serializers.StringRelatedField(many=True)
    degrees = serializers.StringRelatedField(many=True)
    disciplines = serializers.StringRelatedField(many=True)
    graduation_years = serializers.StringRelatedField(many=True)
    institute_types = serializers.StringRelatedField(many=True)
    states = serializers.StringRelatedField(many=True)
    cities = serializers.StringRelatedField(many=True)
    applicants = serializers.SerializerMethodField()


    class Meta:
        model = Job
        fields = [
            'id',
            'designation',
            'salary_range_min',
            'salary_range_max',
            'last_app_date',
            'num_vacancies',

            'gender',

            'description',
            'requirements',
            'key_job_responsibilities',

            'domain',
            'state_of_job',
            'city_of_job',
            'job_type',
            'company',

            'courses',
            'course_groups',
            'degrees',
            'disciplines',
            'graduation_years',
            'institute_types',
            'states',
            'cities',

            'job_status',
            
            'last_app_date_human',
            'num_applicants',
            'applicants'
        ]
        read_only_fields = ['id', 'job_status']

    def get_last_app_date_human(self, obj):
        print(f"\033[95m last_app_date_human \033[0m")
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None
        
    def get_num_applicants(self, obj):
        return JobShortlist.objects.filter(job=obj).count()
       
    def get_applicants(self, obj):
        try:
            print(f"\033[95m getting applicants ************ {obj}\033[0m")
            js = JobShortlist.objects.filter(job=obj).select_related('student')
            print(f"\033[93m 0 ******************** {js}\033[0m")
            jrs_data = {}
            spk_usr_ids = []
            for item in js:
                jrs_data[item.student.spk_usr_id] = {
                    'id': item.student.spk_usr_id,
                    'status': item.application_status
                }
                spk_usr_ids.append(item.student.spk_usr_id)
            print(f"\033[93m 1 ******************** \033[0m")
            sm = StudentMaster.objects.filter(student__user_id__in=spk_usr_ids).select_related('student', 'student__user', 'batch', 'batch__department', 'batch__academic')
            
            print(f"\033[93m 2 ******************** \033[0m")
            for item in sm:
                print(item)
                jrs_data[item.student.user_id]['year'] = item.batch.year
                jrs_data[item.student.user_id]['department'] = item.batch.department.name
                jrs_data[item.student.user_id]['academic'] = item.batch.academic.institution_name
            print(f"\033[93m 3 ******************** \033[0m")
            for stu in jrs_data:
                print(stu)
            print(f"\033[93m 4 ******************** \033[0m")
            return [jrs_data[x] for x in jrs_data]
        except Exception as e:
            print(f"\033[91m Error ******** {e} \033[0m")
        



class CompanyRegisterSerializer(serializers.Serializer):
    company = CompanySerializer()
    job = JobCreateSerializer(required=False, allow_null=True)
    employer = EmployerSerializer()
    # for manager registration

    def to_representation(self, instance):
        print(f"\033[95m instance \033[0m")
        return {
            'company': CompanySerializer(instance['company']).data,
            'employer': EmployerSerializer(instance['employer']).data,
            'job': JobDisplaySerializer(instance['job']).data,
            
        }


    def create(self, validated_data):
        print(f"\033[95m create of CompanyRegisterSerializer \033[0m")
        # Extract Data
        company_data = validated_data.pop('company')
    
        employer_data = validated_data.pop('employer')
        job_data = validated_data.pop('job', None)
        
        try:
            with transaction.atomic():
                
                domain_list = company_data.pop('domain', [])
                
                company = Company.objects.create(**company_data)
                
                if domain_list:
                    company.domain.set(domain_list)

                
                employer = Employer.objects.create(
                    company=company, **employer_data
                )
                employer.approved_by = None
                employer.save()
                print(f"\033[92m created employer \033[0m")
                
                if job_data != None:
                    courses = job_data.pop('courses', None)
                    course_groups = job_data.pop('course_groups', None)
                    degrees = job_data.pop('degrees', None)
                    disciplines = job_data.pop('disciplines', None)
                    graduation_years = job_data.pop('graduation_years', None)
                    institute_types = job_data.pop('institute_types', None)
                    states = job_data.pop('states', None)
                    cities = job_data.pop('cities', None)
                    job = Job.objects.create(company=company, **job_data)
                    if courses:
                        job.courses.set(courses)
                    if course_groups:
                        job.course_groups.set(course_groups)
                    if degrees:
                        job.degrees.set(degrees)
                    if disciplines:
                        job.disciplines.set(disciplines)
                    if graduation_years:
                        job.graduation_years.set(graduation_years)
                    if institute_types:
                        job.institute_types.set(institute_types)
                    if states:
                        job.states.set(states)
                    if cities:
                        job.cities.set(cities)

        except Exception as e:
            print(f"\033[91m error : ******* {e} \033[0m")
        print(f"\033[91m Returning Data \033[0m")
        return {
            'company':company,
            'employer': employer,
            'job': job,
        }


class JobUpdateSerializer(serializers.ModelSerializer):
    last_app_date_human = serializers.SerializerMethodField(read_only=True)
    num_applicants = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id',
            'designation',
            'salary_range_min',
            'salary_range_max',
            'last_app_date',
            'num_vacancies',

            'gender',

            'description',
            'requirements',
            'key_job_responsibilities',

            'domain',
            'state_of_job',
            'city_of_job',
            'job_type',
            'company',

            'courses',
            'course_groups',
            'degrees',
            'disciplines',
            'graduation_years',
            'institute_types',
            'states',
            'cities',

            'job_status',
            
            'last_app_date_human',
            'num_applicants'
        ]
        read_only_fields = ['id', 'last_app_date_human', 'num_applicants']

    def get_last_app_date_human(self, obj):
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None

    def get_num_applicants(self, obj):
        return JobShortlist.objects.filter(job=obj).count()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


    def create(self, validated_data):
        print(f"\033[92m create of TeamSerializer \033[0m")
        password = generate_password()
        with transaction.atomic():
            user = User.objects.create_user(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                username=validated_data['email'],
                email=validated_data['email'],
                password=password)
        return user