# Generated by Django 3.2 on 2021-05-19 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='activation_status',
            field=models.CharField(choices=[(None, '--------'), (1, 'Active'), (3, 'Deactive')], max_length=10),
        ),
        migrations.AlterField(
            model_name='job',
            name='from_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='to_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]