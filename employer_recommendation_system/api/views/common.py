from rest_framework import generics
from emp.models import Job
from api.serializers.employer import JobCreateSerializer

class JobCreateAPIView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobCreateSerializer

    def perform_create(self, serializer):
        return super().perform_create(serializer)