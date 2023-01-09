from rest_framework import serializers
from .models import Supplier

class SupplierGetSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(required=True)
    supplier_city = serializers.CharField(read_only=True, required=False, )
    supplier_address = serializers.CharField(read_only=True, required=False, )
    supplier_phone = serializers.CharField(read_only=True, required=False, )
    supplier_email = serializers.EmailField(required=True, )
    supplier_manager = serializers.CharField(read_only=True, required=False, )
    supplier_level = serializers.CharField(read_only=True, required=False, )

    class Meta:
        model = Supplier
        exclude = ['is_delete', 'create_time', 'update_time', ]
        read_only_fields = ['id']
