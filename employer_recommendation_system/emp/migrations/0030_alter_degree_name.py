# Generated by Django 3.2 on 2021-07-02 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0029_rename_type_jobtype_jobtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='degree',
            name='name',
            field=models.CharField(max_length=200, unique=True, verbose_name='Degree'),
        ),
    ]