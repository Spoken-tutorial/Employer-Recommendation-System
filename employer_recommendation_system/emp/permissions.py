from rest_framework.permissions import BasePermission
from .models import Company, CompanyManagers
from django.contrib.auth.models import Group
from rest_framework import permissions
from .models import JobDetail, Student
class IsCompanyManagerOrReadOnly(BasePermission):
    """
    Custom permission to only allow company managers to modify their own data.
    """
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        return CompanyManagers.objects.filter(company_id = pk, user=request.user).exists()
    
class IsManager(BasePermission):
    def has_permission(self, request, view):
        print(f"\033[97m IS MANAGER 1111\033[0m")
        manager_group = Group.objects.get(name='MANAGER')
        return manager_group in request.user.groups.all()
    
class JobObjectPermission(BasePermission):
    """
    Custom permission class to control access to job-related views based on user roles and request methods.
    """
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        manager_group = Group.objects.get(name='MANAGER')
        job = JobDetail.objects.get(id=pk)
        if request.method in ['DELETE']:
            return (manager_group in request.user.groups.all() or job.added_by==request.user)
        elif request.method in ['PATCH', 'PUT']:
            return job.added_by==request.user 
       
        return False

class StudentPermission(BasePermission):
    """
    Custom permission class to control access to student-related views based on user and request methods.
    """
    def has_permission(self, request, view):
        # Allow access if the user is authenticated and belongs to the 'STUDENT' group and the user is the student accessing edit profile 
        if request.method in ['GET']:
            if request.user.is_authenticated and request.user.groups.filter(name='STUDENT').exists():
                return request.user.student.id == view.kwargs.get('pk')
            
            # Allow access if the user belongs to either 'MANAGER' or 'EMPLOYER' group
            if request.user.is_authenticated and request.user.groups.filter(name__in=['MANAGER', 'EMPLOYER']).exists():
                return True
            return False
        elif request.method in ['PATCH']:
            # Allow edit access if the user is the student accessing edit profile 
            if request.user.is_authenticated and request.user.groups.filter(name='STUDENT').exists():
                return request.user.student.id == view.kwargs.get('pk')
        return False