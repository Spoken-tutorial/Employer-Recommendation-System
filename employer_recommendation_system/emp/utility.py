from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from emp.models import Student
from .serializers import StudentSerializer
from spoken.models import StudentMaster, TestAttendance

def filter_state(queryset, value):
    input_spk_student_ids = [item['spk_student_id'] for item in queryset.values('spk_student_id')]
    spk_student_queryset = StudentMaster.objects.filter(batch__academic__state__name__in=value, student_id__in=input_spk_student_ids).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)
    
def filter_city(queryset, value):
    spk_student_queryset = StudentMaster.objects.filter(batch__academic__city__name__in=value).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)

def filter_resume(queryset, resume_uploaded):
    if resume_uploaded=='yes':
            queryset = queryset.filter(resume__isnull=False)
    if resume_uploaded=='no':
        queryset = queryset.filter(resume__isnull=True)
    return queryset

def filter_foss(queryset, foss, grade):
    input_spk_student_ids = [item['spk_student_id'] for item in queryset.values('spk_student_id')]
    spk_student_queryset = TestAttendance.objects.filter(test__foss__foss=foss, mdlgrade__gte=grade, student_id__in=input_spk_student_ids).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)

def filter_institute_type(queryset, institute_types):
    input_spk_student_ids = [item['spk_student_id'] for item in queryset.values('spk_student_id')]
    spk_student_queryset = StudentMaster.objects.filter(batch__academic__institution_type__name__in=institute_types, student_id__in=input_spk_student_ids).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)

def filter_academic(queryset, academics):
    input_spk_student_ids = [item['spk_student_id'] for item in queryset.values('spk_student_id')]
    spk_student_queryset = StudentMaster.objects.filter(batch__academic_id__in=academics, student_id__in=input_spk_student_ids).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)
    
def filter_acad_start_year(queryset, acad_start_years):
    input_spk_student_ids = [item['spk_student_id'] for item in queryset.values('spk_student_id')]
    spk_student_queryset = StudentMaster.objects.filter(batch__year__in=acad_start_years, student_id__in=input_spk_student_ids).values('student_id')
    student_ids = [item['student_id'] for item in spk_student_queryset]
    return queryset.filter(spk_student_id__in=student_ids)

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    pagination_class = PageNumberPagination
    
    def get_queryset(self):
        queryset = Student.objects.all()
        state = self.request.query_params.getlist('state', None)
        city = self.request.query_params.getlist('city', None)
        is_resume_uploaded = self.request.query_params.get('resume_uploaded', None) #yes, no
        
        institute_type = self.request.query_params.getlist('institute_type', None)
        academic = self.request.query_params.getlist('academic', None)
        acad_start_year = self.request.query_params.getlist('acad_start_year', None)
        department = self.request.query_params.getlist('department', None)
        degree = self.request.query_params.getlist('degree', None)
        
        if state:
            queryset = filter_state(queryset, state)
        
        if city:
            queryset = filter_city(queryset, city)
        if is_resume_uploaded:
            queryset = filter_resume(queryset, is_resume_uploaded)
        
        if institute_type:
            queryset = filter_institute_type(queryset, institute_type)
            
        if academic:
            queryset = filter_academic(queryset, academic)

        if acad_start_year:
            queryset = filter_acad_start_year(queryset, acad_start_year)
        
        if department:
            queryset = queryset.filter(education__acad_discipline__name__in=department)
        
        if degree:
            queryset = queryset.filter(education__degree__name__in=degree) 
            
        for key, value in self.request.query_params.items():
            if key.startswith('foss_'):
                foss = key.split('_')[1]
                grade = value
                queryset = filter_foss(queryset, foss, grade)
        return queryset
            
        
