from rest_framework import serializers
from .models import Event, Testimonial, GalleryImage
from emp.serializers import DateFormatterMixin
from .helper import get_formatted_date

#----------------------------------- Serializers V2 -----------------------------------#
class EventSerializer(DateFormatterMixin,serializers.ModelSerializer):
    date_range = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'name', 'type', 'description', 'status' ,'venue', 'date_range']
        date_fields = ['start_date', 'end_date']

    def get_date_range(self, obj):
        return get_formatted_date(obj.start_date, obj.end_date)

class TestimonialSerializer(serializers.ModelSerializer):
    event = serializers.CharField(source='event.name', read_only=True)
    date = serializers.SerializerMethodField()
    class Meta:
        model = Testimonial
        fields = ['id','event','location','date']

    def get_date(self, obj):
        return get_formatted_date(obj.event.start_date, obj.event.end_date)

class GalleryImageSerializer(serializers.ModelSerializer):
    event = serializers.CharField(source='event.name', read_only=True)
    class Meta:
        model = GalleryImage
        fields = ['id','event','location']