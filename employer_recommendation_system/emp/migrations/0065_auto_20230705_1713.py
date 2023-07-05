# Generated by Django 3.2 on 2023-07-05 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0064_auto_20230510_0447'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='domain',
            field=models.ManyToManyField(blank=True, null=True, related_name='domains', to='emp.Domain'),
        ),
        migrations.AlterField(
            model_name='job',
            name='city',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='city_job',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='degree',
            field=models.ManyToManyField(blank=True, null=True, related_name='degrees', to='emp.Degree'),
        ),
        migrations.AlterField(
            model_name='job',
            name='discipline',
            field=models.ManyToManyField(blank=True, null=True, related_name='disciplines', to='emp.Discipline'),
        ),
        migrations.AlterField(
            model_name='job',
            name='domain',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='emp.domain', verbose_name='Job Sector'),
        ),
        migrations.AlterField(
            model_name='job',
            name='grade',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='num_vacancies',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='shift_time',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.RemoveField(
            model_name='job',
            name='skills',
        ),
        migrations.AddField(
            model_name='job',
            name='skills',
            field=models.ManyToManyField(related_name='jobs', to='emp.Skill'),
        ),
        migrations.AlterField(
            model_name='job',
            name='state',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='state_job',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='about',
            field=models.TextField(blank=True, null=True, verbose_name='About Yourself*'),
        ),
        migrations.AlterField(
            model_name='student',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='Resume*'),
        ),
    ]
