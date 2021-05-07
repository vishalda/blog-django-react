from rest_framework import serializers
from .models import BlogPost, BlogPostComment
from api.user.serializers import UserSerializer,BriefUserSerializer

class BlogPostListSerializer(serializers.ModelSerializer):
    author = BriefUserSerializer(read_only = True)
    image = serializers.ImageField(max_length=None,allow_empty_file = False,allow_null = True,required = False)
    class Meta:
        model = BlogPost
        fields = ('title','description','image','author')

class BlogPostDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only = True)
    image = serializers.ImageField(max_length=None,allow_empty_file = False,allow_null = True,required = False)
    class Meta:
        model = BlogPost
        fields = ('title','description','body','image','author','created_at')

class BlogPostCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only = True)
    post = BlogPostDetailSerializer(read_only = True)
    class Meta:
        model = BlogPostComment
        fields = ('author','post','content','posted_at')