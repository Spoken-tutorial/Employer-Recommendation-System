from django.urls import path
from .views import JobCreateView ,JobListView

urlpatterns = [
    path("jobs/create/",  JobCreateView.as_view(), name="job-create"),
    path("jobs/",  JobListView.as_view(), name="job-list"),
]
