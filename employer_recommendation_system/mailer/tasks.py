from celery import shared_task
from django.utils import timezone
from django.core.mail import send_mail
from .models import EmailRecord, EmailContent


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_bulk_emails(self, email_content_id):
    """
    Celery task to send bulk emails based on EmailContent and linked EmailRecords.
    """
    try:
        content = EmailContent.objects.get(pk=email_content_id)
        records = content.email_records.all()

        for record in records:
            try:
                send_mail(
                    subject=content.subject,
                    message=content.mail_body,
                    from_email=None,
                    recipient_list=[record.email_address],
                    fail_silently=False,
                )
                record.status = 'sent'
                record.sent_at = timezone.now()
                record.save()
            except Exception as e:
                record.status = 'failed'
                record.error_message = str(e)
                record.save()

        return f"Bulk email task completed for EmailContent ID {email_content_id}"

    except Exception as exc:
        raise self.retry(exc=exc)
