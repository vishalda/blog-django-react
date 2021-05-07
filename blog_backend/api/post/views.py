from django.http import JsonResponse
from django.core.serializers import serialize
from .models import BlogPost, BlogPostComment
from .serializers import BlogPostSerializer,BlogPostCommentSerializer 
import json

def LoadPosts(request):
    posts = BlogPost.objects.all().order_by('-created_at').values()
    data = serialize("json",posts,fields = ('title','description','author','image','created_at'))
    #ListOfPost = json.dumps(list(posts))
    return JsonResponse({'success':data})