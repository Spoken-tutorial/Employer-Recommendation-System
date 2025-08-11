from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from api.views.auth import CustomTokenObtainPairView 
from api.views.employer import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), #todo
    path('register/', RegisterCompanyAPIView.as_view(), name='register'), #todo

    path('<int:user_id>/jobs/', ListJobs.as_view(), name='register'), #todo
    path('jobs/', ListJobs.as_view(), name='register'), #todo
    
    path('<int:user_id>/jobs/add/', JobAddView.as_view(), name='register'), #todo

    path('jobs/<int:pk>/', JobDetailView.as_view(), name='register'), #todo
    
    path('<int:user_id>/jobs/<int:pk>/edit/', JobUpdateView.as_view(), name='register'), #todo
    
    #aplicant's status
    # path('<int:user_id>/applicant/status/<int:job_id>/<int:spk_usr_id>/', UpdateApplicantStatus.as_view(), name='register'), #todo
    path('applicant/status/', UpdateApplicantStatus.as_view(), name='register'), #todo
    
    path('<int:user_id>/team/add/', AddTeamView.as_view(), name='register'), #todo
    # path('<int:user_id>/team/', TeamListView.as_view(), name='register'),
    # path('<int:employer_id>/toggle-status/', ToggleEmployerStatusView.as_view(), name='toggle-employer-status'),
    path('jobs/eligibility/', ListJobsEligibility.as_view(), name='register'), #todo
    
]
