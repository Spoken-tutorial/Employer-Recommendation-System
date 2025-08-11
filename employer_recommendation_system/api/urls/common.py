from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api.views.auth import CustomTokenObtainPairView 
from api.views.common import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #jobs
    path('jobs/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
