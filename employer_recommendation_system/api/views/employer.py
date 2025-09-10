from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from emp.models import Company, Job, Employer, Student, JobShortlist
from api.serializers.employer import *
from django_filters.rest_framework import DjangoFilterBackend


class RegisterCompanyAPIView(generics.CreateAPIView):
#     queryset = Company.objects.all()
    serializer_class = CompanyRegisterSerializer

    def perform_create(self, serializer):
        print(f"\033[95m perform create*********** \033[0m")
        serializer.save()
class JobDetailView(generics.RetrieveAPIView):
     queryset = Job.objects.all()
     serializer_class = JobDisplaySerializer
     lookup_field = 'pk'

class JobUpdateView(generics.UpdateAPIView):
     queryset = Job.objects.all()
     serializer_class = JobUpdateSerializer

class JobAddView(generics.UpdateAPIView):
     queryset = Job.objects.all()
     serializer_class = JobUpdateSerializer

# class JobListSerializer(generics.ListAPIView):
class ListJobsEligibility(generics.ListAPIView):
     serializer_class = JobListEligibilitySerializer

     def get_queryset(self):
        
        print(f"\033[95m &&&&&&&& listing jobs &&&&&&&&& \033[0m")
        print(f"\033[92m {self.request.user} \033[0m")
        if self.kwargs.get('user_id'):
          user_id = self.kwargs.get('user_id')
          user = get_object_or_404(User, pk=user_id)
        else:
          print(f"\033[92m getting user from request ^^^^^^^^^ \033[0m")
          user = self.request.user

        # print(f"\033[94m user ******** {user} \033[0m")
        if user.groups.filter(name="EMPLOYER").exists():
            if hasattr(user, 'employer') and user.employer.company:
                    print(f"\033[92m user has employer \033[0m")
                    return Job.objects.filter(company=user.employer.company)
            raise PermissionDenied("Employer profile incomplete.")
        elif user.groups.filter(name='ACCOUNT_MANAGER').exists():
            return Job.objects.filter(added_by=user)
        
        raise PermissionDenied("You are not authorized to view jobs.")



class ListJobs(generics.ListAPIView):
    """
        # ListJobs API view that returns a filtered list of jobs based on the user's role.
        # - If the user belongs to the 'EMPLOYER' group, it returns all jobs posted by the user's company.
        # - If the user is in the 'ACCOUNT_MANAGER' group, it returns only the jobs added by that user.
    """
    # queryset = Job.objects.all()
#     serializer_class = JobDisplaySerializer
    permission_classes = [IsAuthenticated]

    serializer_class = JobListSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'company',
        'state_of_job', #other fields
    ]

    def get_queryset(self):
        
        print(f"\033[95m &&&&&&&& listing jobs &&&&&&&&& \033[0m")
        print(f"\033[92m {self.request.user} \033[0m")
        if self.kwargs.get('user_id'):
          user_id = self.kwargs.get('user_id')
          user = get_object_or_404(User, pk=user_id)
        else:
          print(f"\033[92m getting user from request ^^^^^^^^^ \033[0m")
          user = self.request.user

        # print(f"\033[94m user ******** {user} \033[0m")
        if user.groups.filter(name="EMPLOYER").exists():
            if hasattr(user, 'employer') and user.employer.company:
                    print(f"\033[92m user has employer \033[0m")
                    return Job.objects.filter(company=user.employer.company)
            raise PermissionDenied("Employer profile incomplete.")
        elif user.groups.filter(name='ACCOUNT_MANAGER').exists():
            return Job.objects.filter(added_by=user)
        
        raise PermissionDenied("You are not authorized to view jobs.")
    

class AddTeamView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = TeamSerializer

    def perform_create(self, serializer):
         print(f"\033[92m perform_create of AddTeamView \033[0m")
         user_id = self.kwargs.get('user_id')
         company = Employer.objects.get(user_id=user_id).company
         user = serializer.save()
         employer = Employer.objects.create(
              user=user,
                company=company, added_by_id=user_id,
                approved_by_id=user_id,
              )
         #send mail
         #send_mail

class TeamListView(generics.ListAPIView):
     serializer_class = TeamSerializer

     def get_queryset(self):
          user_id = self.kwargs.get('user_id')
          print(f"\033[95m  user_id ******** {user_id}\033[0m")
        #   queryset = Employer.objects.filter(added_by_id=user_id)
          queryset = User.objects.filter(employer__added_by_id=user_id)
          print(f"\033[93m queryset ****** {queryset} \033[0m")
          return queryset
     

class UpdateApplicantStatus(APIView):
     # def post(self, request, user_id, job_id, spk_usr_id):
     def post(self, request):
          try:
               job_id = request.data.get('job_id')
               spk_usr_id = request.data.get('spk_usr_id')
               new_status = request.data.get('status')
               user = request.user
               print(f"\033[95m spk_usr_id ******** {spk_usr_id} \033[0m")
               # print(f"\033[92m user 1 ****************** {user} \033[0m")
               # user = get_object_or_404(User, pk=user_id)
               # print(f"\033[92m user 2 ****************** {user} \033[0m")
               job = get_object_or_404(Job, pk=job_id)
               student = get_object_or_404(Student, spk_usr_id=spk_usr_id)
               # new_status = request.data.get('status')
               valid_status = [x[0] for x in JobShortlist.JOB_APPLICATION_STATUS]
               if new_status not in valid_status:
                    raise ValidationError("Invalid status value.")
               if job.added_by != user:
                    raise PermissionDenied("You are not authorized to edit applicant's status for this jobs.")
               
               app = JobShortlist.objects.filter(student=student, job=job).first()
               
               app.application_status = new_status
               app.save()
               return Response({"message": "Status updated", "status": app.application_status}, status=200)
          except Exception as e:
               print(f"\033[91m Error ******** {e} \033[0m")