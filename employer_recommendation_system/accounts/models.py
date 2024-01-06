from django.db import models
from django.contrib.auth.models import User
# # Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile')
    is_blocked = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True)