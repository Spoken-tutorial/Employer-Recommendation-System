from django.db import models

# Create your models here.
class FossCategory(models.Model):
    foss = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    status = models.BooleanField(max_length=2)
    is_learners_allowed = models.BooleanField(max_length=2,default=0 )
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    show_on_homepage = models.PositiveSmallIntegerField(default=0, help_text ='0:Series, 1:Display on home page, 2:Archived')
    
    class Meta(object):
        verbose_name = 'FOSS'
        verbose_name_plural = 'FOSSes'
        ordering = ('foss', )

    def __str__(self):
        return self.foss
