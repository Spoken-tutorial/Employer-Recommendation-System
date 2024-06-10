# from django.db import models
# from django.db.models import Count, Prefetch
# from .models import JobShortlist

# class JobDetailManager(models.Manager):
#     def with_applicants_count(self):
#         return self.get_queryset().prefetch_related(
#             Prefetch(
#                 'jobshortlist_set',
#                 queryset=JobShortlist.objects.values('job_id').annotate(applicants_count=Count('job_id')),
#                 to_attr='applicants_count_list'
#             )
#         )