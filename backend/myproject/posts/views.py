from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, SinglePostSerializer
from .models import Posts
from users.middleware import jwt_token_required


@api_view(['POST'])
@permission_classes([AllowAny])
@jwt_token_required
def save_post(request):
    post = request.data
    serializedData = PostSerializer( data=post)

    if serializedData.is_valid():
        newPost = serializedData.save()
        return Response({"message":"Post created successfully!", "post_id":newPost.id}, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_posts(request):
    posts = Posts.objects.all()
    serializedData = PostSerializer( posts, many=True).data
    return Response( serializedData, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_posts_count(request):
    count = Posts.objects.count()
    return Response(count, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_post_by_id(request, post_id):
    try:
        post = Posts.objects.get( id=post_id)
        serializedData = SinglePostSerializer( post, many=False).data
        return Response( serializedData, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response("Post does not exist!", status=status.HTTP_404_NOT_FOUND)

# Get posts by author id
@api_view(['GET'])
@jwt_token_required
def get_posts_by_user_id(request, user_id):
    posts = Posts.objects.filter(author=user_id)

    if not posts.exists():
        return Response("No posts found for this user!", status=status.HTTP_404_NOT_FOUND)
    serializedData = PostSerializer( posts, many=True ).data
    return Response(serializedData, status=status.HTTP_200_OK)

#Delete post by id
@api_view(['DELETE'])
@permission_classes([AllowAny])
@jwt_token_required
def delete_post_by_id(request, post_id):
    try:
        post = Posts.objects.get( id=post_id)
        post.delete()
    except Posts.DoesNotExist:
        return Response("Post not found!", status=status.HTTP_404_NOT_FOUND)
    return Response("Post deleted successfully.", status=status.HTTP_200_OK)
    
# Update post
@api_view(['PUT'])
@permission_classes([AllowAny])
@jwt_token_required
def update_post_by_id(request, post_id):
    try:
        post = Posts.objects.get( id=post_id)
    except Posts.DoesNotExist:
        return Response("Post not found!", status=status.HTTP_404_NOT_FOUND)
    
    if post.author != request.user:
        return Response("Access denied!", status=status.HTTP_401_UNAUTHORIZED)
    
    serializedData = PostSerializer( data=request.data, partial=True)
    if serializedData.is_valid():
        serializedData.save()
        return Response({"message":"Post updated successfully."}, status=status.HTTP_200_OK)
    return Response(serializedData.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)