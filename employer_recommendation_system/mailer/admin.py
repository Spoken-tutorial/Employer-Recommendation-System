from django.contrib import admin

# Register your models here.
from .models import EmailRecord, EmailContent

@admin.register(EmailRecord)
class EmailRecordAdmin(admin.ModelAdmin):
    list_display = ('email_address', 'status', 'sent_at', 'error_message')
    list_filter = ('status',)
    search_fields = ('email_address',)


@admin.register(EmailContent)
class EmailContentAdmin(admin.ModelAdmin):
    list_display = ('subject', 'created_at', 'user_id')
    filter_horizontal = ('email_records',)
