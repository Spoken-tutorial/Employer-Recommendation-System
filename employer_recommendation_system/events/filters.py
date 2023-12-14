import django_filters
from .models import Event

class EventFilter(django_filters.FilterSet):
    class Meta:
        model = Event
        fields = {
            'status': ['exact'],
            'show_on_homepage': ['exact'],
        }