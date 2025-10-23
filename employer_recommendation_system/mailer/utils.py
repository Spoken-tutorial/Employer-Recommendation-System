import csv
from .models import EmailRecord

def import_emails_from_csv(csv_file):
    """
    Reads a CSV containing email addresses and returns a list of EmailRecord objects.
    CSV must have a column named 'email'.
    """
    records = []
    reader = csv.DictReader(csv_file.read().decode('utf-8').splitlines())
    for row in reader:
        email = row.get('email')
        if email:
            record, _ = EmailRecord.objects.get_or_create(email_address=email)
            records.append(record)
    return records
