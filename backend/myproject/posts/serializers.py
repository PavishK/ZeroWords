from rest_framework import serializers
from .models import Posts

class PostSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Posts
        fields = [ "id", "author", "title", "content", "category", "image_url", "created_at", "updated_at"]

class SinglePostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField( source="author.username", read_only=True)
    author_email = serializers.EmailField( source="author.email", read_only=True)

    class Meta:
        model = Posts
        fields = [ "id", "author_name", "author_email", "title", "content", "category", "image_url", "created_at", "updated_at"]
