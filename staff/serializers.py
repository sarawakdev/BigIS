from rest_framework import serializers
from .models import Staff

class StaffGetSerializer(serializers.ModelSerializer):
    staff_name = serializers.CharField(required=True)
    staff_surname = serializers.CharField(read_only=True, required=False, )
    staff_position = serializers.CharField(read_only=True, required=False, )
    staff_email = serializers.EmailField(required=True, )
    staff_phone = serializers.CharField(read_only=True, required=False, )

    class Meta:
        model = Staff
        exclude = ['is_delete', 'create_time', 'update_time', ]
        read_only_fields = ['id']