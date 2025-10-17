from django.urls import path
from .views import get_posts, get_post_by_id, get_posts_count, get_posts_by_user_id
from .views import save_post, delete_post_by_id, update_post_by_id

urlpatterns = [
    path('save-post/', view=save_post, name="SavePost"),
    path('get-posts/', view=get_posts, name="GetPosts"),
    path('get-posts-count/', view=get_posts_count, name="GetPostsCount"),
    path('get-post-by-id/<int:post_id>/', view=get_post_by_id, name="GetPostById"),
    path('get-posts-by-user-id/<int:user_id>/', view=get_posts_by_user_id, name="GetPostByUserId"),
    path('update-post-by-id/<int:post_id>/', view=update_post_by_id, name="UpdatePostById"),
    path('delete-post-by-id/<int:post_id>/', view=delete_post_by_id, name="DeletePostById")
]