from .models import BlogPost, BlogPostComment,BlogCategory
from .serializers import BlogPostListSerializer,BlogPostDetailSerializer,BlogCategorySerializer
from rest_framework import viewsets
from django.http import JsonResponse
from api.user.models import CustomUser
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from . import views
import os, openpyxl
from django.db import connection

book=openpyxl.Workbook()
sheet=book.active

# Create your views here.
cursor=connection.cursor()

#Creating a post
@csrf_exempt
def CreatePost(request,id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only Post request'})

    title = request.POST['title']
    description = request.POST['description']
    body = request.POST['body']
    image = request.FILES['image']
    category_id = request.POST['category_id']
    #Getting user model using id
    author = get_object_or_404(CustomUser,pk=id)
    category = get_object_or_404(BlogCategory,pk=category_id)
    instance = BlogPost.objects.create(title=title,description=description,body=body,image = image,author=author,category=category)
    instance.save()
    query='''SELECT * FROM post_blogpost;'''
    cursor.execute(query)
    results=cursor.fetchall()
    i=0
    for row in results:
        i += 1
        j = 1
        for col in row:
            cell = sheet.cell(row = i, column = j)
            cell.value = col
            j += 1
    book.save("Post.ods")
    return JsonResponse({'success':"Post created successfully"})

@csrf_exempt
def UpdatePostTextFields(request,post_id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only POST requests'})
    instance = BlogPost.objects.get(pk=post_id)
    #TODO: Need to be updated
    instance.body = request.POST['body']
    instance.title = request.POST['title']
    instance.description = request.POST['description']

    instance.save()
    query='''SELECT * FROM post_blogpost;'''
    cursor.execute(query)
    results=cursor.fetchall()
    i=0
    for row in results:
        i += 1
        j = 1
        for col in row:
            cell = sheet.cell(row = i, column = j)
            cell.value = col
            j += 1
    book.save("Post.ods")
    return JsonResponse({'success':'instance saved'})

@csrf_exempt
def UpdatePostImage(request,post_id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only POST requests'})
    instance = BlogPost.objects.get(pk=post_id)
    instance.image = request.FILES['image']
    instance.save()
    query='''SELECT * FROM post_blogpost;'''
    cursor.execute(query)
    results=cursor.fetchall()
    i=0
    for row in results:
        i += 1
        j = 1
        for col in row:
            cell = sheet.cell(row = i, column = j)
            cell.value = col
            j += 1
    book.save("Post.ods")
    return JsonResponse({'success':'Image added'})

@csrf_exempt
def DeletePost(request,post_id):
    instance = BlogPost.objects.get(pk=post_id)
    instance.delete()
    query='''SELECT * FROM post_blogpost;'''
    cursor.execute(query)
    results=cursor.fetchall()
    i=0
    for row in results:
        i += 1
        j = 1
        for col in row:
            cell = sheet.cell(row = i, column = j)
            cell.value = col
            j += 1
    book.save("Post.ods")
    return JsonResponse({'success':'Successfully deleted the post'})

@csrf_exempt
def CreateComment(request,author_id,blog_id):
    if request.method!="POST":
        return JsonResponse({'error':'Accepting only Post request'})
    content = request.POST['content']
    blog_post = get_object_or_404(BlogPost,pk=blog_id)
    author = get_object_or_404(CustomUser,pk=author_id)

    instance = BlogPostComment.objects.create(content=content,blogpost_connected=blog_post,author=author)
    instance.save()
    query='''SELECT * FROM post_blogpostcomment;'''
    cursor.execute(query)
    results=cursor.fetchall()
    i=0
    for row in results:
        i += 1
        j = 1
        for col in row:
            cell = sheet.cell(row = i, column = j)
            cell.value = col
            j += 1
    book.save("Comment.ods")
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

class CategoryListViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all().order_by('id')
    serializer_class = BlogCategorySerializer

class PostDetailViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostDetailSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostListSerializer