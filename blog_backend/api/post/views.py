from .models import BlogPost, BlogPostComment
from .serializers import BlogPostListSerializer,BlogPostCommentSerializer 
from rest_framework import viewsets
from django.http import JsonResponse
from . import views

def PostDetail(request,id):
    return JsonResponse({'success':'J'})

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostListSerializer