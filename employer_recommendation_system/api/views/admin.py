from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from emp.models import Company, Job

from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib.auth.models import User
from api.serializers.employer import CompanyRegisterSerializer, JobUpdateSerializer, CompanySerializer, JobListSerializer, JobCreateSerializer
from rest_framework import generics

class ManagerDashboardView(APIView):
	"""
	API endpoint for manager dashboard.
	"""
	permission_classes = [AllowAny]
	def get(self, request):
		companies = Company.objects.all()
		jobs = Job.objects.all()
		
		companies_data = [
			{
				'id': c.id,
				'name': c.name,
				
			} for c in companies
		]
		jobs_data = [
			{
				'id': j.id,
				'title': j.title,
				
			} for j in jobs
		]
		return Response({
			'companies': companies_data,
			'jobs': jobs_data
		}, status=status.HTTP_200_OK)

class ManagerJobsListView(generics.ListAPIView):
	permission_classes = [AllowAny]
	serializer_class = JobListSerializer
	def get_queryset(self):
		return Job.objects.all()

class ManagerJobCreateView(generics.CreateAPIView):
	permission_classes = [AllowAny]
	serializer_class = JobCreateSerializer
	def perform_create(self, serializer):
		
		user = self.request.user if getattr(self.request, 'user', None) and self.request.user.is_authenticated else (
			User.objects.filter(is_superuser=True).first() or User.objects.first()
		)
		designation = serializer.validated_data.get('designation') or 'Untitled'
		serializer.save(added_by=user, title=designation)

class ManagerCompaniesListView(generics.ListAPIView):
	permission_classes = [AllowAny]  # removed admin only restriction for now
	serializer_class = CompanySerializer
	pagination_class = None  # return all companies for dropdowns

	def get_queryset(self):
		return Company.objects.all()  # show companies data from the table

class ManagerCompanyCreateView(generics.CreateAPIView):
	permission_classes = [AllowAny]
	serializer_class = CompanySerializer
	def perform_create(self, serializer):
		user = self.request.user if getattr(self.request, 'user', None) and self.request.user.is_authenticated else (
			User.objects.filter(is_superuser=True).first() or User.objects.first()
		)
		serializer.save(added_by=user)

class ManagerCompanyDetailView(generics.RetrieveAPIView):
	"""Retrieve a single company by id for manager UI."""
	permission_classes = [AllowAny]
	serializer_class = CompanySerializer
	queryset = Company.objects.all()

class ManagerCompanyUpdateView(generics.UpdateAPIView):
	"""Update a company by id for manager UI."""
	permission_classes = [AllowAny]
	serializer_class = CompanySerializer
	queryset = Company.objects.all()
