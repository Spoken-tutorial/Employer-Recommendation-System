from rest_framework.permissions import BasePermission
from .models import Company, CompanyManagers

class IsCompanyManagerOrReadOnly(BasePermission):
    """
    Custom permission to only allow company managers to modify their own data.
    """
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        return CompanyManagers.objects.filter(company_id = pk, user=request.user).exists()