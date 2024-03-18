# Generated by Django 3.2.19 on 2024-03-16 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('utilities', '0003_institutetype_location'),
        ('emp', '0080_jobshortlist_job_detail'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='studentfilterlocation',
            unique_together={('job', 'city')},
        ),
        migrations.AlterUniqueTogether(
            name='studentfilteryear',
            unique_together={('job', 'year')},
        ),
    ]
