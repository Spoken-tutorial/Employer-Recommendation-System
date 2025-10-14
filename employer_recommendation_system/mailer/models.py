from django.db import models

# Create your models here.


class EmailRecord(models.Model):
    """
    Stores individual email addresses and their sending status.
    Each row corresponds to one email address from the uploaded CSV file.
    """
    email_address = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending'),
            ('sent',),
            ('failed',),
        ],
        default='pending'
    )
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.email_address} - {self.status}"


class EmailContent(models.Model):
    """
    Stores the common mail subject and body for a group of email addresses.
    One EmailContent can be linked to multiple EmailRecords.
    """
    subject = models.CharField(max_length=255)
    mail_body = models.TextField()
    email_records = models.ManyToManyField(
        EmailRecord,
        related_name='email_contents'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        related_name='email_contents'
    )

    def __str__(self):
        return f"EmailContent (Subject: {self.subject})"
