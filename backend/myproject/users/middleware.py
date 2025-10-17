from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .utils import decode_jwt_token

User = get_user_model()

def jwt_token_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('jwt_token')

        if not token:
            return Response({"detail": "Token missing."}, status=status.HTTP_400_BAD_REQUEST)

        payload = decode_jwt_token(token)

        if payload is None:
            return Response({"detail": "Session expired!"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = User.objects.get(id=payload.get('id'))
            request.user = user
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_401_UNAUTHORIZED)

        return func(request, *args, **kwargs)

    return wrapper
