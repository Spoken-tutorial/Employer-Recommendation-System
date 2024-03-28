from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# # Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile')
    is_blocked = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True)

class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    @property
    def is_expired(self):
        return self.expires_at < timezone.now()