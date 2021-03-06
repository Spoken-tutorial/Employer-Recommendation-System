# Generated by Django 3.2 on 2021-06-11 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0005_alter_company_added_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='phone',
        ),
        migrations.AlterField(
            model_name='company',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Description about the company'),
        ),
        migrations.AlterField(
            model_name='company',
            name='emp_contact',
            field=models.CharField(max_length=100, verbose_name='Phone Number'),
        ),
        migrations.AlterField(
            model_name='company',
            name='emp_name',
            field=models.CharField(max_length=200, verbose_name='Company HR Representative Name'),
        ),
    ]
