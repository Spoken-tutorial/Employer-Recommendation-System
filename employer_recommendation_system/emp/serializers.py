from rest_framework import serializers
from .models import Company, Job, CompanyManagers, Domain, JobType
from spoken.models import SpokenState, SpokenCity
from accounts.serializers import UserSerializer
from datetime import datetime
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
    domain = DomainSerializer()
    class Meta:
        model = Company
        # fields = '__all__'
        fields = ['id', 'name', 'website', 'date_created', 'is_agency', 'domain', 'managers']

    def get_managers(self, obj):
         cm = CompanyManagers.objects.filter(company=obj.id)
         s = CompanyManagerSerializer(cm, many=True)
         return s.data
    

class JobSerializer(serializers.ModelSerializer):
    job_state = serializers.SerializerMethodField()
    city_state = serializers.SerializerMethodField()
    domain = DomainSerializer()
    job_type = JobTypeSerializer()
    company = serializers.CharField(source='company.name')
    created = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = '__all__'
        fields = ['id', 'designation', 'job_state', 'city_state', 'salary_range_min', 'salary_range_max', 'created',
                  'updated', 'requirements',  'key_job_responsibilities', 'last_app_date', 'num_vacancies',
                   'domain', 'job_type', 'company', 'skills', 'degree', 'discipline', 'job_foss' ]
        
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