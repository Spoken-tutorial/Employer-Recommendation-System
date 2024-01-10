from datetime import date
from rest_framework import serializers
class DateFormatterMixin:
    """
    Mixin for formatting date fields in a model.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.date_fields:
            formatted_field = f'formatted_{field}'
            setattr(self, formatted_field, self.format_date(field))
            self.fields[formatted_field] = serializers.SerializerMethodField(method_name=f'get_formatted_{field}')

    def format_date(self, field):
        date = getattr(self.instance, field)
        return date.strftime('%d %B %Y %H:%M:%S') if date else None
