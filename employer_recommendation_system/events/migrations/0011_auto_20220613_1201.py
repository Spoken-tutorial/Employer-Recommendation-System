# Generated by Django 3.2 on 2022-06-13 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
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
            name='start_date',
            field=models.DateField(),
        ),
    ]
