from django.urls import path, re_path
from . import views

urlpatterns = [
    path(r'', views.APISupplierViewSet.as_view({'get': 'list', 'post': 'create'}), name='staff-list'),
    re_path(r'^(?P<staff_uniq_id>[0-9a-zA-Z]+)/$', views.APISupplierViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
]