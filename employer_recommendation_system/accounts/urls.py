from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

from .views import *
from emp.helper import store_otp, validate_otp

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # path('', LoginViewCustom.as_view(redirect_authenticated_user=True), name='login'),
    path('login/', LoginViewCustom.as_view(redirect_authenticated_user=True), name='login'),
	# path('register/success/', LoginView.as_view(), name='register_success'),
    path('register/', RegisterView.as_view(), name='register'), 
    # path('profile/', TemplateView.as_view(template_name="profile.html")),
    path('register_student/', register_student, name='register_student'), 
    path('validate_student/', validate_student, name='validate_student'),
    path('forgot-password/', reset_password, name='reset_password'),
    path('accounts/change-password/', change_password, name='change_password'),

    #API for registration data
    path('accounts/api/registration', RegistrationDataView.as_view(), name='register_api'),
    path('accounts/api/validate_company_name/', validate_unique_data, name='validate_company_name'),
    path('accounts/api/store_otp/', store_otp, name='store_otp'),
    path('accounts/api/validate_otp/', validate_otp, name='validate_otp'),

    #----------------------------------- APIs V2 -----------------------------------#
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password-reset-confirm'),
    path('api/password-change/', ChangePasswordView.as_view(), name='change-password'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('api/reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('api/change-password/', ChangePasswordAPIView.as_view(), name='change_password'),
    path('api/profile/', ProfileUpdateView.as_view(), name='update_profile'),
    

]

