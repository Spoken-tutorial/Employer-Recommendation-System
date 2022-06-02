# Generated by Django 3.2 on 2022-05-13 18:00

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0009_event_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Event Description'),
        ),
        migrations.AlterField(
            model_name='event',
            name='end_date',
            field=models.DateField(help_text='YYYY-MM-DD'),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_date',
            field=models.DateField(help_text='YYYY-MM-DD'),
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.CharField(choices=[('JOB', 'JobFair'), ('INTERN', 'Internship'), ('HACKATHON', 'Hackathon'), ('MAPATHON', 'Mapathon'), ('PILOT_WORKSHOP', 'Pilot Workshop')], default='JOB', max_length=200),
        ),
    ]