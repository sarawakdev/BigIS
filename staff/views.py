from django.shortcuts import render
from .models import Staff
from . import serializers
from rest_framework import viewsets
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class APIStaffViewSet(viewsets.ModelViewSet):
    """
        retrieve:
            Return a staff instance.

        list:
            Return all staff, ordered by most recently joined.

        create:
            Create a new staff.

        delete:
            Remove an existing staff.

        partial_update:
            Update one or more fields on an existing staff.

        update:
            Update a staff.
    """

    queryset = Staff.objects.all()
    serializer_class = serializers.StaffGetSerializer
    lookup_field = 'staff_uniq_id'

    def get_queryset(self):
        return Staff.objects.filter(is_delete=False)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.is_delete = True
        instance.save()

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
            
