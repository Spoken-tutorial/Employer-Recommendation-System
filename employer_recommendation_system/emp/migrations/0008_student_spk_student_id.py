# Generated by Django 3.2 on 2021-06-11 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0007_auto_20210611_0944'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='spk_student_id',
            field=models.IntegerField(null=True),
        ),
    ]
