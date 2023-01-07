from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.views import exception_handler


def ExceptionHandler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        response.data['status_code'] = response.status_code
        response.data['message'] = response.data['detail']
        response.data.pop('detail')
    return response