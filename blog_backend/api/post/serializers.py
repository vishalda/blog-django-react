from rest_framework import serializers
from .models import BlogPost, BlogPostComment
from api.user.serializers import UserSerializer


class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only = True)
    class Meta:
        model = BlogPost
        fields = ('title','description','body','image','author','created_at')

class BlogPostCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only = True)
    post = BlogPostSerializer(read_only = True)
    class Meta:
        model = BlogPostComment
        fields = ('author','post','content','posted_at')