import django_filters
from .models import Company

class CompanyFilter(django_filters.FilterSet):
    class Meta:
        model = Company
        fields = {
            # 'status': ['exact'],
            'show_on_homepage': ['exact'],
        }