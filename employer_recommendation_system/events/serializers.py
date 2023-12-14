from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name','start_date', 'end_date', 'type','show_on_homepage', 'description', 'status']