from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from .middleware import jwt_token_required
from .utils import generate_jwt_token
from re import match
from posts.models import Posts

Users = get_user_model()

# ✅ Common cookie settings for cross-origin (React:5172, Django:8000)
cookie_settings = {
    "httponly": True,
    "secure": True,            # Must be True when SameSite=None
    "samesite": "None",
    "path": "/",               # Keep path root
}

# ⚙️ Register User
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ⚙️ Login User
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"detail": "Missing username or password"}, status=status.HTTP_400_BAD_REQUEST)

    # If email is entered instead of username
    if match(r"^[\w\.-]+@[\w\.-]+\.\w+$", username):
        try:
            user_data = Users.objects.get(email=username)
            username = user_data.username  # authenticate() expects username
        except Users.DoesNotExist:
            return Response({"detail": "User with this email not found"}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate user
    user = authenticate(request=request, username=username, password=password)

    if user is not None:
        # Generate JWT token
        jwt_token = generate_jwt_token(user)

        # Send token in cookie
        response = Response({"message": "Login successful", "id":user.id}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='jwt_token',
            value=jwt_token,
            max_age=259200,  # 3 days
            **cookie_settings
        )
        return response

    return Response({"detail": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

# ⚙️ WhoAmI (check current user)
@api_view(['GET'])
@jwt_token_required
def whoami(request):
    user = request.user  # ✅ comes from decorator
    return Response(
        {"id": user.id, "username": user.username, "email": user.email},status=status.HTTP_200_OK)
   

# ⚙️ Logout User
@api_view(['POST'])
@permission_classes([AllowAny])
def logout_user(_):
    response = Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
    response.delete_cookie("jwt_token", samesite="None", path="/")
    return response

@api_view(['GET'])
@jwt_token_required
def profile_data(request):
    count = Posts.objects.filter(author=request.user.id).count()
    user = {
        "username":request.user.username,
        "email":request.user.email,
        "postCount": count
    }
    return Response({"data":user}, status=status.HTTP_200_OK)
