# Generated by Django 3.2 on 2021-10-21 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_galleryimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
