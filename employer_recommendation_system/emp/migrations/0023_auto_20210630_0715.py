# Generated by Django 3.2 on 2021-06-30 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0022_auto_20210628_0819'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='degree',
            field=models.ManyToManyField(to='emp.Degree'),
        ),
        migrations.AddField(
            model_name='job',
            name='discipline',
            field=models.ManyToManyField(to='emp.Discipline'),
        ),
    ]
