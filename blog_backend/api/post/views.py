from .models import BlogPost, BlogPostComment
from .serializers import BlogPostSerializer,BlogPostCommentSerializer 
from rest_framework import viewsets
from . import views

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostSerializer