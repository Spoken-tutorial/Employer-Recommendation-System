from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from emp.models import Company, CompanyManagers, Job, Skill, JobFoss, JobFilterState,JobFilterCity, Degree, Discipline, JobFilterYear
from utilities.models import City
from accounts.models import Profile as JRSProfile

class RegistrationFormSerializer(serializers.Serializer):
    company_name = serializers.CharField(max_length=255)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone']
        extra_kwargs = {
            'phone': {'required': True}
        }

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'profile', 'password']
        extra_kwargs = {
        'password' : {'write_only': True},
    }

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        user = User.objects.create_user(**validated_data)
        profile = JRSProfile.objects.create(**profile_data, user=user)
        return user

    def get_profile(self, obj):
        try:
            p = Profile.objects.get(user=obj.id)
        except:
            p = None
        return ProfileSerializer(p).data

class CompanyRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        # fields = ['id', 'name', 'website', 'date_created', 'is_agency', 'domain', 'managers']
        fields = ['id', 'name', 'website', 'date_created', 'is_agency']
        extra_kwargs = {'id': {'read_only': True}, 'date_created': {'read_only': True}}

class UserRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'name', 'website', 'date_created', 'is_agency', 'domain', 'managers']
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'username']
        extra_kwargs = {'id': {'read_only': True}, 'date_created': {'read_only': True}}

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id']
        # fields = ['id', 'name']

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = ['id', 'name']

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ['id', 'name']
    
class JobRegSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    ws = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    degrees = DegreeSerializer(many=True, read_only=True)
    wdeg = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    disciplines = DisciplineSerializer(many=True, read_only=True)
    wdis = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    domain = serializers.IntegerField(write_only=True)
    wjob_city = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    class Meta:
        model = Job
        fields = ['id', 'designation', 'num_vacancies', 'salary_range_min', 'salary_range_max', 
                  'description', 'key_job_responsibilities','requirements', 'domain', 'skills' ,'ws', 'degrees', 'disciplines',
                  'wdis', 'wdeg', 'wjob_city']
        read_only_fields = ['id', 'date_created']
        
    def create(self, validated_data):   
        skills_data = validated_data.pop('ws')
        degree_data = validated_data.pop('wdeg')
        disp_data = validated_data.pop('wdis')
        domain = validated_data.pop('domain')
        job_city = validated_data.pop('wjob_city')
        
        try:
            job = Job(**validated_data)
            job.save()
            skill_objs = Skill.objects.filter(id__in=skills_data)
            job.skills.set(skill_objs)
            degress_objs = Degree.objects.filter(id__in=degree_data)
            job.degree.set(degress_objs)
            disp_objs = Discipline.objects.filter(id__in=disp_data)
            job.discipline.set(disp_objs)
            job.domain_id = domain
            job.save()
            job_cities = City.objects.filter(id__in=job_city)
            job.city_job.set(job_cities)
        except Exception as e:
            print(e)
        return job

class CompanyManagerSerializer(serializers.Serializer):
    
    class Meta:
        model = CompanyManagers
        fields = ['id', 'company', 'user', 'status', 'group', 'date_created', 'date_updated']
        read_only_fields = ['id', 'date_created', 'date_updated']

class CompanyRegistrationSerializer(serializers.Serializer):
    company = CompanyRegSerializer()
    user = UserRegSerializer()
    job = JobRegSerializer()
    mandatory_foss = serializers.ListField(child=serializers.IntegerField())
    optional_foss = serializers.ListField(child=serializers.IntegerField())
    filter_state = serializers.ListField(child=serializers.IntegerField())
    filter_city = serializers.ListField(child=serializers.IntegerField())
    years = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    def create(self, validated_data):
        company_data = validated_data.pop('company')
        user_data = validated_data.pop('user')
        job_data = validated_data.pop('job')
        company_serializer = CompanyRegSerializer(data=company_data)
        company_serializer.is_valid(raise_exception=True)
        company = company_serializer.save()
        user_serializer = UserRegSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        job_serializer = JobRegSerializer(data=job_data)
        try:
            job_serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)
        job = job_serializer.save()
        job.company = company
        job.save()
        
        mandatory_foss = validated_data.pop('mandatory_foss')
        optional_foss = validated_data.pop('optional_foss')
        JobFoss.objects.bulk_create([JobFoss(job=job, foss_id=foss_id, type='Mandatory') for foss_id in mandatory_foss])
        JobFoss.objects.bulk_create([JobFoss(job=job, foss_id=foss_id, type='Optional') for foss_id in optional_foss])

        filter_state = validated_data.pop('filter_state')
        filter_city = validated_data.pop('filter_city')
        JobFilterState.objects.bulk_create([JobFilterState(job=job, state_id=state_id) for state_id in filter_state])
        JobFilterCity.objects.bulk_create([JobFilterCity(job=job, city_id=city_id) for city_id in filter_city])
        
        years = validated_data.pop('years')
        JobFilterYear.objects.bulk_create([JobFilterYear(job=job, year=year) for year in years])

        return {
            'company': company,
            'user': user,
            'job': job,
            'mandatory_foss': mandatory_foss,
            'optional_foss': optional_foss,
            'filter_state': filter_state,
            'filter_city': filter_city
        }
    

#----------------------------------- Serializers V2 -----------------------------------#
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        roles = [group.name for group in user.groups.all()]
        token['roles'] = roles
        token['email'] = user.email
        token['user_id'] = user.id
        token['name'] = f"{user.first_name} {user.last_name}"
        return token