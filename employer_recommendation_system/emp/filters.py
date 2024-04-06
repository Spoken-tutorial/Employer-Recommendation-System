import django_filters
from django.db.models import Q
from .models import Company, Job, Student
from events.models import Event

class CompanyFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name',lookup_expr='icontains')
    domain = django_filters.CharFilter(field_name='domain__name',lookup_expr='icontains')
    status = django_filters.CharFilter(field_name='status')
    class Meta:
        model = Company
        fields = ['name', 'domain', 'status']

class JobFilter(django_filters.FilterSet):
    company = django_filters.CharFilter(field_name='company__name',lookup_expr='icontains')
    designation = django_filters.CharFilter(field_name='designation',lookup_expr='icontains')
    domain = django_filters.CharFilter(field_name='domain__name',lookup_expr='icontains')
    app_start_date = django_filters.DateFilter(field_name='last_app_date',lookup_expr='gte')
    app_end_date = django_filters.DateFilter(field_name='last_app_date',lookup_expr='lte')
    status = django_filters.CharFilter(field_name='status')
    class Meta:
        model = Job
        fields = ['company', 'designation', 'domain', 'app_start_date', 'app_end_date']

class StudentFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(method='filter_by_name')
    joined_start = django_filters.DateFilter(field_name='created',lookup_expr='gte')
    joined_end = django_filters.DateFilter(field_name='created',lookup_expr='lte')
    state = django_filters.CharFilter(method='filter_by_state')
    city = django_filters.CharFilter(method='filter_by_city')
    insti_type = django_filters.CharFilter(method='filter_by_insti_type')

    class Meta:
        model = Student
        fields = ['name']

    def filter_by_name(self,queryset,name,value):
        return queryset.filter(Q(user__first_name__icontains=value) | Q(user__last_name__icontains=value) | Q(user__email__icontains=value) )
    
class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name',lookup_expr='icontains')
    start_date = django_filters.DateFilter(field_name='end_date',lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='end_date',lookup_expr='lte')
    class Meta:
        model = Event
        fields = ['name', 'start_date', 'end_date']


class JobDetailFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status')