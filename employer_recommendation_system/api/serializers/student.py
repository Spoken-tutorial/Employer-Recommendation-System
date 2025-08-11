from rest_framework import serializers
from emp.models import Student, Project, Job
from spoken.models import SpokenUser, FossMdlCourses, StudentMaster
from moodle.models import MdlUser, MdlQuizGrades
from .auth import UserSerializer

import datetime

class SpokenStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'desc']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'desc']

def get_spoken_student_details(spk_student):
    try:
        sm = StudentMaster.objects.filter(student__user_id=obj.spk_usr_id).select_related(
            'batch', 'batch__department', 'batch__academic', 'batch__academic__state').first()
        print(f"\033[95m sm ******* \033[0m")
        print(f"\033[95m {sm} \033[0m")
        data = {
            'department': sm.batch.department.name,
            'year': sm.batch.year,
            'academic': sm.batch.academic.institution_name,
            'institute_type': sm.batch.academic.institution_type.name,
            'state': sm.batch.academic.state.name,
            'city': sm.batch.academic.city.name,
            'gender': sm.student.gender,
            'unique_id': sm.student.user.id
        }
        return data
    except Exception as e:
        print(f"\033[91m {e} \033[0m")
        return None


class StudentExternalSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)
    grades = serializers.SerializerMethodField()
    spoken_details = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['about', 'certifications', 'projects', 'grades', 'spoken_details' ]


    def get_grades(self, obj):
        email = obj.user.email
        print(f"\033[92m email - {email} \033[0m")
        mu = MdlUser.objects.get(email=email)
        print(f"\033[92m mu - {mu} \033[0m")
        grades = MdlQuizGrades.objects.filter(userid=mu.id)
        print(f"\033[92m grades - {grades} \033[0m")
        quizzes = [x.quiz for x in grades]
        print(f"\033[92m quizzes - {quizzes} \033[0m")
        fmdl = FossMdlCourses.objects.filter(mdlquiz_id__in=quizzes).select_related('foss')
        print(f"\033[92m fmdl - {fmdl} \033[0m")
        quiz_foss_map = {}
        for item in fmdl:
            quiz_foss_map[item.mdlquiz_id] = item.foss.foss
        foss_grade_map = {}
        for item in grades:
            key = quiz_foss_map[item.quiz]
            grade = round(item.grade, 2)
            t_readable = datetime.datetime.fromtimestamp(item.timemodified).strftime("%d %b %Y")
            foss_grade_map[key] = {
                'grade': grade,
                'tdate': t_readable,
            }
        print(f"\033[93m quiz_grade_map : {foss_grade_map} \033[0m")
        return foss_grade_map

    def get_spoken_details(self, obj):
        # get_spoken_student_details(obj)
        try:
            sm = StudentMaster.objects.filter(student__user_id=obj.spk_usr_id).select_related(
                'batch', 'batch__department', 'batch__academic', 'batch__academic__state').first()
            print(f"\033[95m sm ******* \033[0m")
            print(f"\033[95m {sm} \033[0m")
            data = {
                'department': sm.batch.department.name,
                'year': sm.batch.year,
                'academic': sm.batch.academic.institution_name,
                'institute_type': sm.batch.academic.institution_type.name,
                'state': sm.batch.academic.state.name,
                'city': sm.batch.academic.city.name,
                'gender': sm.student.gender,
                'unique_id': sm.student.user.id
            }
            return data
        except Exception as e:
            print(f"\033[91m {e} \033[0m")

class StudentProfileSerializer(StudentExternalSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ['user', 'phone', 'github', 'linkedin', 'about', 'certifications', 'projects', 'grades', 'spoken_details' ]
        # fields = [ ]

class StudentProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['phone', 'alternate_email']

class StudentJobsSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    last_app_date_human = serializers.SerializerMethodField()
    # salary = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['id', 'designation', 'company', 'salary_range_min', 'salary_range_max', 'last_app_date_human']
    
    def get_last_app_date_human(self, obj):
        # print(f"\033[95m last_app_date_human \033[0m")
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None

    # def get_salary(self, obj):
    #     if not obj.salary_range_min and not obj.salary_range_max:
    #         return None
    #     if obj.salary_range_min and not obj.salary_range_max:
    #         return obj.salary_range_min
    #     if obj.salary_range_max and not obj.salary_range_min:
    #         return obj.salary_range_min
    #     return f"{obj.salary_range_min} - {}"

# class JobDetailSerializer(serializers.ModelSerializer):

class StudentJobDetailSerializer(serializers.ModelSerializer):
    last_app_date_human = serializers.SerializerMethodField()
    domain = serializers.StringRelatedField() #This will return the __str__() representation of the related object.
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
            # 'num_applicants',
            # 'applicants'
        ]
        read_only_fields = ['id', 'job_status']

    def get_last_app_date_human(self, obj):
        print(f"\033[95m 1 last_app_date_human \033[0m")
        if obj.last_app_date:
            return obj.last_app_date.strftime("%d %b %Y, %I:%M %p")
        return None