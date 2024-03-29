# Generated by Django 3.2 on 2021-07-28 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0037_auto_20210728_0540'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='city_c',
            field=models.IntegerField(default=1, verbose_name='City (Company Headquarters)'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='company',
            name='state_c',
            field=models.IntegerField(default=1, verbose_name='State (Company Headquarters)'),
            preserve_default=False,
        ),
    ]
