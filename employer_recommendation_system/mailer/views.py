from django.shortcuts import render

# Create your views here.
from django.shortcuts import redirect
from django.contrib import messages
from .models import EmailContent
from .tasks import send_bulk_emails

def trigger_bulk_mail(request, content_id):
    """
    Trigger Celery task to send emails asynchronously for a given EmailContent.
    """
    content = EmailContent.objects.get(pk=content_id)
    send_bulk_emails.delay(content.id)
    messages.success(request, f"Email sending started for '{content.subject}'")
    return redirect('admin:mailer_emailcontent_changelist')
