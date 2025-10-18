from django.db import models
from django.conf import settings


class Posts(models.Model):
    author = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete= models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    image_url = models.URLField(max_length=1000)
    category = models.CharField( max_length=100 )
    created_at = models.DateTimeField( auto_now_add=True )
    updated_at = models.DateTimeField( auto_now=True )
    
    class Meta:
        ordering = ['-created_at'] 

    def __str__(self):
        return self.title
