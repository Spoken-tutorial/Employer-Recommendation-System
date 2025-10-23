from django.shortcuts import render
from rest_framework import generics
from emp.models import JobDetail
from employer.serializers import JobCreateSerializer
from common.permissions import IsAdminOrEmployer
# Create your views here.

# CREATE  (POST /api/jobs/create/)
class JobCreateView(generics.CreateAPIView):
    queryset = JobDetail.objects.all()
    serializer_class = JobCreateSerializer
    permission_classes = [IsAdminOrEmployer]

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
class JobListView(generics.ListAPIView):
    queryset = JobDetail.objects.all()
    serializer_class = JobCreateSerializer