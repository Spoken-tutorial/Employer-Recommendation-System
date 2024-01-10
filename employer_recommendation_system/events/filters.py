import django_filters
from .models import Event
from django.db.models import Q

class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name',lookup_expr='icontains')
    year = django_filters.NumberFilter(method='filter_by_year')
    
    class Meta:
        model = Event
        fields = ['name', 'year']

    def filter_by_year(self,queryset,name,value):
        print(f"\033[93m name,value : {name} | {value} \033[0m")
        return queryset.filter(Q(start_date__year=value) | Q(end_date__year=value))
    
class TestimonialFilter(django_filters.FilterSet):
    event = django_filters.CharFilter(field_name='event__name',lookup_expr='icontains')
    year = django_filters.NumberFilter(method='filter_by_year')
    
    class Meta:
        model = Event
        fields = ['event', 'year']

    def filter_by_year(self,queryset,name,value):
        print(f"\033[93m name,value : {name} | {value} \033[0m")
        return queryset.filter(Q(event__start_date__year=value) | Q(event__end_date__year=value))