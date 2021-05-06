# Generated by Django 3.2 on 2021-05-06 12:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import emp.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('emp_name', models.CharField(max_length=200)),
                ('emp_contact', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=250)),
                ('phone', models.CharField(max_length=15)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='')),
                ('description', models.TextField(blank=True, null=True)),
                ('domain', models.CharField(max_length=400)),
                ('company_size', models.CharField(choices=[('< 50', '< 50'), ('50 - 100', '50 - 100'), ('100 - 500', '100 - 500'), ('> 500', '> 500')], max_length=25)),
                ('website', models.URLField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('status', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, max_length=250, null=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.city')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Degree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Domain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute', models.CharField(max_length=400)),
                ('start_year', models.IntegerField()),
                ('end_year', models.IntegerField()),
                ('gpa', models.CharField(blank=True, max_length=10, null=True)),
                ('degree', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='emp.degree')),
            ],
        ),
        migrations.CreateModel(
            name='JobType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('latitude', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
                ('longtitude', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=400)),
                ('spk_institute', models.IntegerField()),
                ('about', models.TextField(blank=True, null=True)),
                ('experience', models.TextField(blank=True, null=True)),
                ('picture', models.FileField(blank=True, null=True, upload_to=emp.models.profile_picture)),
                ('github', models.URLField(blank=True, null=True)),
                ('linkedin', models.URLField(blank=True, null=True)),
                ('cover_letter', models.FileField(blank=True, null=True, upload_to='')),
                ('date_created', models.DateTimeField(blank=True, null=True)),
                ('date_updated', models.DateTimeField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('spk_usr_id', models.IntegerField()),
                ('gender', models.CharField(max_length=10)),
                ('location', models.CharField(blank=True, max_length=400, null=True)),
                ('state', models.CharField(max_length=400)),
                ('district', models.CharField(max_length=400)),
                ('city', models.CharField(max_length=400)),
                ('education', models.ManyToManyField(to='emp.Education')),
                ('skills', models.ManyToManyField(to='emp.Skill')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('designation', models.CharField(max_length=250)),
                ('skills', models.CharField(max_length=400)),
                ('description', models.TextField(blank=True, null=True)),
                ('salary_range_min', models.IntegerField(blank=True, null=True)),
                ('salary_range_max', models.IntegerField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('benefits', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('requirements', models.TextField(blank=True, null=True)),
                ('shift_time', models.CharField(max_length=200)),
                ('key_job_responsibilities', models.TextField(blank=True, null=True)),
                ('gender', models.CharField(choices=[('f', 'f'), ('m', 'm'), ('a', 'No criteria')], max_length=10)),
                ('slug', models.SlugField(blank=True, max_length=250, null=True)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.city')),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='emp.company')),
                ('domain', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.domain')),
                ('job_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.jobtype')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.state')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.state'),
        ),
        migrations.AddField(
            model_name='city',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='emp.state'),
        ),
        migrations.CreateModel(
            name='AppliedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.job')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emp.student')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='city',
            unique_together={('name', 'state')},
        ),
    ]