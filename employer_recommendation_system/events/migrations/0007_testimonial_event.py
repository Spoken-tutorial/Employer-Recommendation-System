# Generated by Django 3.2 on 2021-10-18 18:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_testimonial'),
    ]

    operations = [
        migrations.AddField(
            model_name='testimonial',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='events.event'),
        ),
    ]
