import django_filters
from .models import Company

class CompanyFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name',lookup_expr='icontains')
    domain = django_filters.CharFilter(field_name='domain__name',lookup_expr='icontains')
    class Meta:
        model = Company
        fields = ['name', 'domain']