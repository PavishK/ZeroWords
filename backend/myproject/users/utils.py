from jwt import encode, decode, InvalidTokenError, ExpiredSignatureError
from django.conf import settings
import datetime

def generate_jwt_token(user):
    """Generate JWT token with expiry"""
    payload = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3) # Expires in 3 days
    }
    token = encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token

def decode_jwt_token(token):
    try:
        payload = decode( jwt=token, key=settings.SECRET_KEY, algorithms='HS256')
        return payload
    except (InvalidTokenError, ExpiredSignatureError):
        return None
