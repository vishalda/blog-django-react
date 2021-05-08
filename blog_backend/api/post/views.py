from .models import BlogPost, BlogPostComment
from .serializers import BlogPostListSerializer,BlogPostDetailSerializer
from rest_framework import viewsets
from django.http import JsonResponse
from api.user.models import CustomUser
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from . import views

#Retrieving comments 
def LoadComment(request,id):
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

#Creating a post
@csrf_exempt
def CreatePost(request,id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only Post request'})

    title = request.POST['title']
    description = request.POST['description']
    body = request.POST['body']
    image = request.FILES['image']
    #Getting user model using id
    author = get_object_or_404(CustomUser,pk=id)
    instance = BlogPost.objects.create(title=title,description=description,body=body,image = image,author=author)
    instance.save()
    return JsonResponse({'success':"Post created successfully"})

class PostDetailViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostDetailSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostListSerializer