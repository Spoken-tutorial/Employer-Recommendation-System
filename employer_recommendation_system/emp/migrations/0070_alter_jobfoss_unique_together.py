# Generated by Django 4.2.7 on 2023-12-14 05:08

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("utilities", "0001_initial"),
        ("emp", "0069_alter_job_status"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="jobfoss",
            unique_together={("job", "foss")},
        ),
    ]