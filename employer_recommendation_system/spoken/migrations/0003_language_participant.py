# Generated by Django 3.2 on 2022-06-13 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('spoken', '0002_spokengroup_spokenusergroup'),
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('code', models.CharField(default='en', max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('email', models.EmailField(max_length=255, null=True)),
                ('gender', models.CharField(choices=[('', '--- Gender ---'), ('M', 'Male'), ('F', 'Female'), ('O', "Don't wish to disclose")], max_length=6, null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('registartion_type', models.PositiveSmallIntegerField(choices=[('', '-----'), (1, 'Subscribed College'), (2, 'Manual Registration')], default=1)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('reg_approval_status', models.PositiveSmallIntegerField(default=0)),
                ('college', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='spoken.academiccenter')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='spoken.department')),
                ('foss_language', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='spoken.language')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='spoken.spokenstate')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='spoken.spokenuser')),
            ],
        ),
    ]
