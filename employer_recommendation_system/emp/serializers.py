from rest_framework import serializers
from emp.models import Student, Skill, SkillGroup, Education


class EducationSerializer(serializers.ModelSerializer):
    degree = serializers.CharField(source='degree.name', read_only=True)
    acad_discipline = serializers.CharField(source='acad_discipline.name', read_only=True)
    class Meta:
        model = Education
        fields = ['degree', 'acad_discipline','institute', 'start_year', 'end_year', 'gpa', 'order']

class SkillGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGroup
        fields = ['name']

class SkillSerializer(serializers.ModelSerializer):
    group = SkillGroupSerializer()
    class Meta:
        model = Skill
        fields = ['name', 'group' ]


class StudentSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    skills = SkillSerializer(many=True)
    education = EducationSerializer(many=True)

    class Meta:
        model = Student
        fields = ['email', 'first_name', 'last_name','gender' ,'phone', 'address',
                    'github', 'linkedin','alternate_email',
                    'profile_update_date','joining_immediate',
                    'avail_for_intern', 'willing_to_relocate',
                    'skills','education','notified_date']
        
        #todo : add more fields here
        #education, spk_institute, skills, 
        # resume, state, district, city
        #certifications, notified_date,
        #