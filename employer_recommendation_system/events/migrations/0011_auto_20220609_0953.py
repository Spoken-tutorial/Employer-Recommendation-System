# Generated by Django 3.2 on 2022-06-09 09:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0057_student_profile_update_date'),
        ('events', '0010_auto_20220513_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='event',
            name='logo',
            field=models.FileField(blank=True, null=True, upload_to='brochures'),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.CharField(choices=[('JOB', 'Job'), ('JOBFAIR', 'JobFair'), ('INTERN', 'Internship'), ('HACKATHON', 'Hackathon'), ('MAPATHON', 'Mapathon'), ('PILOT_WORKSHOP', 'Pilot Workshop')], default='JOB', max_length=200),
        ),
        migrations.CreateModel(
            name='JobFair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('students_enrolled', models.IntegerField(blank=True, null=True)),
                ('students_placed', models.IntegerField(blank=True, null=True)),
                ('venue', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('VIRTUAL', 'virtual'), ('PHYSICAL', 'physical')], max_length=100)),
                ('student_last_registration', models.DateField(blank=True, null=True)),
                ('emp_last_registration', models.DateField(blank=True, null=True)),
                ('companies', models.ManyToManyField(blank=True, null=True, to='emp.Company')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event')),
                ('jobs', models.ManyToManyField(blank=True, null=True, to='emp.Job')),
            ],
        ),
    ]
