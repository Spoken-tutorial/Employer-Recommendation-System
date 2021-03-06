from django.urls import path
from .views import * 
from . import views

urlpatterns = [
    # path('',views.index,name='index'),
    path('student',views.student_homepage,name="student"),
    path('<pk>/profile/<int:job>',views.student_profile_confirm,name='student_profile_confirm'),
    path('<pk>/profile',views.student_profile,name='student_profile'),
    path('add_student_job_status',views.add_student_job_status,name='add_student_job_status'),
    path('student_profile/<int:id>/<int:job>',views.student_profile_details,name='student_profile_details'),
    path('manager',views.manager_homepage,name="manager"),
    path('shortlist_student',views.shortlist_student,name='shortlist_student'),
    ################### company urls : currently only accessible to MANAGER Role : Set conditions via admin
    path('add_company/', CompanyCreate.as_view(), name='add_company'),
    path('<slug:slug>/update-company/', CompanyUpdate.as_view(), name='update-company-detail'),
    path('company_list/', CompanyListView.as_view(), name='company-list'),
    path('company/<slug:slug>/', CompanyDetailView.as_view(), name='company-detail'),
    ################### job urls
    path('add_job/', JobCreate.as_view(), name='add_job'),
    path('<slug:slug>/update-job/', JobUpdate.as_view(), name='update-job-detail'),
    path('job_list/', JobListView.as_view(), name='job-list'),
    path('my_jobs/', views.student_jobs, name='student_jobs'),
    path('job/<slug:slug>/', JobDetailView.as_view(), name='job-detail'),
    path('job_listings/', JobListingView.as_view(), name='job-listing'),
    ################### jobshortlist
    path('job_application_status/', JobAppStatusListView.as_view(), name='job-app-status'),
    path('job_application_status/<int:id>/', views.job_app_details, name='job-app-detail'),
    path('ajax-state-city/', views.ajax_state_city, name='ajax_state_city'),
    path('logout', views.handlelogout, name='logout'),
    path('<pk>/document', views.document_view, name='document_view'), #resume & cover_letter as 'type' query
    # path('employer',views.employer_homepage,name="employer"),
    ################### Degree urls : currently only accessible to MANAGER Role : Set conditions via admin
    path('add_degree/', DegreeCreateView.as_view(), name='add_degree'),
    path('<slug:slug>/update-degree/', DegreeUpdateView.as_view(), name='update-degree'),
    ################### Discipline urls : currently only accessible to MANAGER Role : Set conditions via admin
    path('add_discipline/', DisciplineCreateView.as_view(), name='add_discipline'),
    path('<slug:slug>/update-discipline/', DisciplineUpdateView.as_view(), name='update-discipline'),
    # path('discipline/<slug:slug>/', DisciplineDetailView.as_view(), name='discipline-detail'),
    ################### Domain urls : currently only accessible to MANAGER Role : Set conditions via admin
    path('add_domain/', DomainCreateView.as_view(), name='add_domain'),
    path('<slug:slug>/update-domain/', DomainUpdateView.as_view(), name='update-domain'),
    ################### Domain urls : currently only accessible to MANAGER Role : Set conditions via admin
    path('add_job_type/', JobTypeCreateView.as_view(), name='add_job_type'),
    path('<slug:slug>/update_job_type/', JobTypeUpdateView.as_view(), name='update_job_type'),


    # path('degree/<slug:slug>/', DegreeDetailView.as_view(), name='degree-detail'),
    # path('degree/', CompanyListView.as_view(), name='company-list'),
    # path('degree/<slug:slug>/', CompanyDetailView.as_view(), name='company-detail'),
]
