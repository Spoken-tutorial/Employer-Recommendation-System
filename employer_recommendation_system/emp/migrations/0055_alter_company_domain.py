# Generated by Django 3.2 on 2022-03-21 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0054_auto_20220321_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='domain',
            field=models.ManyToManyField(blank=True, related_name='domains', to='emp.Domain'),
        ),
    ]
