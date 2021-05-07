from .models import BlogPost, BlogPostComment
from .serializers import BlogPostListSerializer,BlogPostDetailSerializer
from rest_framework import viewsets
from django.http import JsonResponse
from . import views

def Comment(request,id):
    return JsonResponse({'Test':'Success'})

class PostDetailViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostDetailSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostListSerializer