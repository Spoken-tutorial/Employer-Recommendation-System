from rest_framework.permissions import BasePermission
from common.utils import is_admin, is_employer

class IsAdminOrEmployer(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        r = user and user.is_authenticated and (is_admin(user) or is_employer(user))
        return r