# Generated by Django 3.2 on 2021-08-06 11:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0045_galleryimages_testimonials'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GalleryImages',
            new_name='GalleryImage',
        ),
        migrations.RenameModel(
            old_name='Testimonials',
            new_name='Testimonial',
        ),
    ]
