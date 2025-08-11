from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from api.views.auth import CustomTokenObtainPairView 

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
