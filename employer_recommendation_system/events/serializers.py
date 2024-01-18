from rest_framework import serializers
from .models import Event, Testimonial, GalleryImage, JobFair
from emp.models import JobShortlist, Student
from emp.serializers import DateFormatterMixin
from .helper import get_formatted_date
from emp.serializers import DateFormatterMixin
from events.models import JobFairAttendance

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

class JobFairSerializer(DateFormatterMixin, serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    class Meta:
        model = JobFair
        fields = ['id','event','students_enrolled', 'venue', 'type', 'student_last_registration']
        date_fields = ['student_last_registration']

class JobShortlistSerializer(DateFormatterMixin, serializers.ModelSerializer):
    job_id = serializers.IntegerField(source='job.id', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    company = serializers.CharField(source='job.company.name', read_only=True)
    jobtype = serializers.CharField(source='job.job_type.jobtype', read_only=True)
    class Meta:
        model = JobShortlist
        fields = ['id', 'job_id', 'job_title', 'date_created', 'app_status', 'jobtype', 'company']
        date_fields = ['date_created']


class JobFairAttendanceSerializer(DateFormatterMixin, serializers.ModelSerializer):
    event = serializers.CharField(source='event.name', read_only=True)
    # jobfair_id = serializers.IntegerField(source='jobfair.id', read_only=True)
    start_date = serializers.DateField(source='event.start_date', read_only=True)
    end_date = serializers.DateField(source='event.end_date', read_only=True)
    class Meta:
        model = JobFairAttendance
        fields = ['id', 'jobfair_id', 'event', 'status', 'date_created']
        date_fields = ['start_date', 'end_date']

