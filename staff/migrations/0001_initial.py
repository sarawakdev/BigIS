# Generated by Django 4.1.2 on 2023-01-07 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff_name', models.CharField(max_length=255, verbose_name='Staff Name')),
                ('staff_surname', models.CharField(max_length=255, verbose_name='Staff Surname')),
                ('staff_position', models.CharField(max_length=255, verbose_name='Staff Position')),
                ('staff_email', models.EmailField(max_length=255, verbose_name='Staff Email')),
                ('staff_phone', models.CharField(max_length=255, verbose_name='Staff Phone')),
                ('staff_uniq_id', models.CharField(max_length=255, verbose_name='Staff Unique ID')),
                ('is_delete', models.BooleanField(default=False, verbose_name='Is Delete')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='Create Time')),
                ('update_time', models.DateTimeField(auto_now=True, null=True, verbose_name='Update Time')),
            ],
            options={
                'verbose_name': 'Staff',
                'verbose_name_plural': 'Staff',
                'db_table': 'staff',
                'ordering': ['create_time'],
            },
        ),
    ]
