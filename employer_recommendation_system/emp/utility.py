from spoken.models import TestAttendance
from emp.models import Job, Student, JobFoss, JobShortlist
import datetime
from events.serializers import JobFairSerializer, EventSerializer, JobShortlistSerializer
from emp.serializers import JobSerializer
from events.models import JobFair, Event, JobFairAttendance
from django.db.models import Q, F
# from django.db.models.functions import DateFormat


class StudentService:
    @staticmethod
    def get_recommended_jobs(jrs_user_id):
        skp_student_id = Student.objects.get(user__id=jrs_user_id).spk_student_id
        active_jobs = Job.objects.filter(last_app_date__gte=datetime.date.today()) #, add status='published' later
        ta = TestAttendance.objects.filter(student_id=skp_student_id)
        recommended_jobs = [
            job for job in active_jobs if all(
                ta.filter(test__foss_id=job_foss.foss_id, mdlgrade__gte=job_foss.grade).exists()
                for job_foss in JobFoss.objects.filter(job_id=job.id, type='Mandatory')
            )
        ]
        return JobSerializer(recommended_jobs, many=True).data

    @staticmethod
    def get_upcoming_events():
        jobfairs = JobFair.objects.filter(event__end_date__gte=datetime.date.today(), event__status=True)
        jobfair_event_ids = [jobfair.event_id for jobfair in jobfairs]
        events = Event.objects.filter(~Q(id__in=jobfair_event_ids), end_date__gte=datetime.date.today(), status=True)
        return {
            'upcoming_jobfairs': JobFairSerializer(jobfairs, many=True).data,
            'other_upcoming_events': EventSerializer(events, many=True).data
        }
    
    @staticmethod
    def get_student_events(jrs_user_id):
        applied_jobs = JobShortlist.objects.filter(student__user__id=jrs_user_id)
        applied_events = JobFairAttendance.objects.filter(student__user__id=jrs_user_id).values_list('event_id', flat=True)
        student_events = Event.objects.filter(id__in=applied_events)
        return {
            'applied_jobs': JobShortlistSerializer(applied_jobs, many=True).data,
            'events': EventSerializer(student_events, many=True).data
        }
    
