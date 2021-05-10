from .models import BlogPost, BlogPostComment,BlogPostLike
from .serializers import BlogPostListSerializer,BlogPostDetailSerializer
from rest_framework import viewsets
from django.http import JsonResponse
from api.user.models import CustomUser
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from . import views

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
    createLikeModel(instance.id)
    return JsonResponse({'success':"Post created successfully"})

@csrf_exempt
def UpdatePost(request,post_id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only POST requests'})
    instance = BlogPost.objects.get(pk=post_id)
    #TODO: Need to be updated
    instance.body = request.POST['body']
    instance.title = request.POST['title']
    instance.description = request.POST['description']
    instance.image = request.FILES['image']
    instance.save()
    return JsonResponse({'success':'instance saved'})

@csrf_exempt
def CreateComment(request,author_id,blog_id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only Post request'})
    content = request.POST['content']
    blog_post = get_object_or_404(BlogPost,pk=blog_id)
    author = get_object_or_404(CustomUser,pk=author_id)

    instance = BlogPostComment.objects.create(content=content,blogpost_connected=blog_post,author=author)
    instance.save()
    return JsonResponse({'success':"Comment added Successfully"})

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

def createLikeModel(blog_id):
    blog_post = get_object_or_404(BlogPost,pk=blog_id)
    instance = BlogPostLike.objects.create(likes=0,blogpost_connected=blog_post)
    instance.save()

class PostDetailViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostDetailSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogPostListSerializer