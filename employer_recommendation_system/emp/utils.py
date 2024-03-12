from utilities.models import FossCategory, State
from .models import Domain, JobType, Discipline, Degree, Skill
import datetime

def get_job_form_data():
    current_year = datetime.datetime.now().year
    data = {
            'domains': Domain.objects.all().values('id', 'name'),
            'job_types': JobType.objects.all().values('id', 'jobtype'),
            'disciplines': Discipline.objects.all().values('id', 'name'),
            'degrees': Degree.objects.all().values('id', 'name'),
            'skills': Skill.objects.all().values('id', 'name'),
            'states': State.objects.all().values('id', 'name'),
            'graduation_years': list(range(current_year-2, current_year+3)),
            'foss': FossCategory.objects.filter(is_learners_allowed=True).values('id', 'foss')
        }
    return data

def get_company_data():
    pass