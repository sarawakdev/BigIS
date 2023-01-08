from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.views import exception_handler


def ExceptionHandler(exc, context):
    """
    If the response is not None, then add a status_code and message key to the response data
    
    :param exc: The exception instance
    :param context: This is the request context, which is a dictionary containing information about the
    request
    :return: The response is being returned.
    """
    response = exception_handler(exc, context)
    if response is not None:
        response.data['status_code'] = response.status_code
        response.data['message'] = response.data['detail']
        response.data.pop('detail')
    return response