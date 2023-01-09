from django.shortcuts import render
from .models import Supplier
from . import serializers
from rest_framework import viewsets, status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
# Create your views here.

class APISupplierViewSet(viewsets.ModelViewSet):
    """
        retrieve:
            Return a supplier instance.

        list:
            Return all supplier, ordered by most recently joined.

        create:
            Create a new supplier.

        delete:
            Remove an existing supplier.

        partial_update:
            Update one or more fields on an existing supplier.

        update:
            Update a supplier.
    """

    queryset = Supplier.objects.all()
    serializer_class = serializers.SupplierGetSerializer
    lookup_field = 'supplier_uniq_id'

    def get_queryset(self):
        return Supplier.objects.filter(is_delete=False)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.is_delete = True
        instance.save()

    def list(self, request, *args, **kwargs):
        """
        It returns the list of all the objects in the database

        :param request: The request object
        :return: The list of all the objects in the database.
        """
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        It returns the super class's create method, which is the same as the create method in the
        ModelViewSet class
        """
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        It returns the super class's retrieve method, which is the same as the retrieve method in the
        ModelViewSet class
        """
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        It returns the super class's update method, which is the same as the update method in the
        ModelViewSet class
        """
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """
        It returns the super class's partial_update method, which is the same as the partial_update
        method in the ModelViewSet class
        """
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        It returns the super class's destroy method, which is the same as the destroy method in the
        ModelViewSet class
        """
        return super().destroy(request, *args ,**kwargs)
