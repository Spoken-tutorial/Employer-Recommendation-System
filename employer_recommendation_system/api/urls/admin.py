from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from api.views.auth import CustomTokenObtainPairView 

from api.views.admin import ManagerDashboardView
from api.views.admin import (
    ManagerJobsListView,
    ManagerJobCreateView,
    ManagerCompaniesListView,
    ManagerCompanyCreateView,
    ManagerCompanyDetailView,
    ManagerCompanyUpdateView,
)
from api.views.employer import JobDetailView, JobUpdateView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('manager/', ManagerDashboardView.as_view(), name='manager-dashboard'),
    path('manager/jobs', ManagerJobsListView.as_view(), name='manager-jobs-list'),
    path('manager/jobs/add', ManagerJobCreateView.as_view(), name='manager-job-create'),
    path('manager/jobs/<int:pk>/', JobDetailView.as_view(), name='manager-job-detail'),
    path('manager/jobs/edit/<int:pk>/', JobUpdateView.as_view(), name='manager-job-update'),
    path('manager/companies', ManagerCompaniesListView.as_view(), name='manager-companies-list'),
    path('manager/companies/add', ManagerCompanyCreateView.as_view(), name='manager-company-create'),
    path('manager/companies/<int:pk>/', ManagerCompanyDetailView.as_view(), name='manager-company-detail'),
    path('manager/companies/edit/<int:pk>/', ManagerCompanyUpdateView.as_view(), name='manager-company-update'),
]
