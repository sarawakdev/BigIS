# Generated by Django 4.1.2 on 2023-01-09 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='staff_uniq_id',
            field=models.CharField(max_length=255, unique=True, verbose_name='Staff Unique ID'),
        ),
    ]
