from django.contrib.auth import get_user_model
from rest_framework import serializers
from re import match
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already in use!")
        if len(value) < 4:
            raise serializers.ValidationError("Username must be at least 4 characters long.")
        if not match(r"^[A-Za-z]+$", value):
            raise serializers.ValidationError("Username must contain only letters.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use!")
        if not match(r"^[\w\.-]+@[\w\.-]+\.\w+$", value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value
    
    def validate_password(self, value):
        if( len(value) < 6 or len(value) > 15 ):
            raise serializers.ValidationError("Password lenght must between 6 and 15")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
