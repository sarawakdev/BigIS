from django.db import models

# Create your models here.
class Staff(models.Model):
    staff_name = models.CharField(max_length=255, verbose_name='Staff Name')
    staff_surname = models.CharField(max_length=255, verbose_name='Staff Surname')
    staff_position = models.CharField(max_length=255, verbose_name='Staff Position')
    staff_email = models.EmailField(max_length=255, verbose_name='Staff Email')
    staff_phone = models.CharField(max_length=255, verbose_name='Staff Phone')
    staff_uniq_id = models.CharField(max_length=255, verbose_name='Staff Unique ID')
    is_delete = models.BooleanField(default=False, verbose_name='Is Delete')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='Create Time')
    update_time = models.DateTimeField(auto_now=True, blank=True, null=True, verbose_name='Update Time')

    class Meta:
        db_table = 'staff'
        verbose_name = 'Staff'
        verbose_name_plural = 'Staff'
        ordering = ['create_time']
