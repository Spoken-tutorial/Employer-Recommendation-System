from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from api.views.auth import CustomTokenObtainPairView 
from api.views.student import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('external/<int:spk_usr_id>/', StudentExternalView.as_view(), name='token_obtain_pair'),
    path('jobs/', StudentJobList.as_view(), name='token_obtain_pair'),
    path('jobs/<int:pk>/', StudentJobDisplay.as_view(), name='token_obtain_pair'),
    path('jobs/apply/', save_job_application, name='token_obtain_pair'),
    path('profile/<int:spk_usr_id>/', StudentProfileView.as_view(), name='token_obtain_pair'),
    path('update/<int:spk_usr_id>/', StudentProfileUpdateView.as_view(), name='token_obtain_pair'),

]
