from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from emp.models import Student, Job, JobShortlist
from api.serializers.student import StudentExternalSerializer, StudentJobsSerializer, StudentJobDetailSerializer, StudentProfileSerializer, StudentProfileUpdateSerializer
    

class StudentExternalView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentExternalSerializer
    lookup_field = 'spk_usr_id'

class StudentJobList(generics.ListAPIView):
    # queryset = Job.objects.all()
    serializer_class = StudentJobsSerializer

    def get_queryset(self):
        print(f"\033[92m user ********** {self.request.user} \033[0m")
        student = Student.objects.get(user=self.request.user)
        print(f"\033[93m student id : {student.id} \033[0m")
        # jobs = [x.job for x in JobShortlist.objects.filter(student=student)]
        job_ids = [x.job.id for x in JobShortlist.objects.filter(student=student)]
        jobs = Job.objects.filter(id__in=job_ids)
        # print(f"\033[93m jobs ******** {jobs} \033[0m")
        # print(f"\033[95m type of job ******* {type(jobs)} \033[0m")
        return jobs
    
class StudentJobDisplay(generics.RetrieveAPIView):
    serializer_class = StudentJobDetailSerializer
    queryset = Job.objects.all()
    lookup_field = 'pk'

    def get_object(self):
        obj = super().get_object()
        print(f"\033[92m ^^^^^^^^^^^^^ {obj.id} \033[0m")
        print(f"\033[92m obj 10 ********* {obj} \033[0m")
        return obj
    
@api_view(['POST'])
def save_job_application(request):
    # print(f"\033[95m ^^^^^^^^^^^^^^^^^ save_job_application ^^^^^^^^^^^^^^^^^\033[0m")
    print(f"\033[94m ^^^^^^^^^^^^^^^^^ save_job_application ^^^^^^^^^^^^^^^^^ \033[0m")
    job_id = request.data.get('job_id')
    if not job_id:
        return Response({'error': 'Job ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        student = Student.objects.get(user=request.user)
        JobShortlist.objects.create(job_id=job_id, student=student, spk_user=student.spk_usr_id)
        print(f"\033[92m created job id \033[0m")
    except:
        return Response({'error': 'Error in applying for job'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Application successful'}, status=status.HTTP_201_CREATED)
    
class StudentProfileView(generics.RetrieveAPIView):
    serializer_class = StudentProfileSerializer
    queryset = Student.objects.all()
    lookup_field='spk_usr_id'

class StudentProfileUpdateView(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentProfileUpdateSerializer
    lookup_field = 'spk_usr_id'