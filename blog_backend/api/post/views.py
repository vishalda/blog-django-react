from .models import BlogPost, BlogPostComment
from .serializers import BlogPostListSerializer,BlogPostDetailSerializer
from rest_framework import viewsets
from django.http import JsonResponse
from . import views

#Retrieving comments 
def Comment(request,id):
    #Filtering comments using id of blog post
    commentSet = BlogPostComment.objects.filter(blogpost_connected_id = id).values()
    commentList = []
    #Adding query sets into list and retrieving it
    for cs in commentSet:
        commentList.append(cs)
    if commentList:
        return JsonResponse({'comments':commentList})
    else:
        return JsonResponse({'error':'No comments to display'})

class PostDetailViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostDetailSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostListSerializer