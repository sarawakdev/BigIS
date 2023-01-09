from django.db import models

# Create your models here.
class Supplier(models.Model):
    supplier_name = models.CharField(max_length=255, verbose_name='Supplier Name')
    supplier_city = models.CharField(max_length=255, verbose_name='Supplier City')
    supplier_address = models.CharField(max_length=255, verbose_name='Supplier Address')
    supplier_phone = models.CharField(max_length=255, verbose_name='Supplier Phone')
    supplier_email = models.EmailField(max_length=255, verbose_name='Supplier Email')
    supplier_manager = models.CharField(max_length=255, verbose_name='Supplier Manager')
    supplier_level = models.CharField(max_length=255, verbose_name='Supplier Level')
    is_delete = models.BooleanField(default=False, verbose_name='Is Delete')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='Create Time')
    update_time = models.DateTimeField(auto_now=True, blank=True, null=True, verbose_name='Update Time')

    class Meta:
        db_table = 'supplier'
        verbose_name = 'Supplier'
        verbose_name_plural = 'Supplier'
        ordering = ['supplier_name']