from rest_framework import serializers
from .models import BlogPost, BlogPostComment,BlogCategory
from api.user.serializers import UserSerializer,BriefUserSerializer

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('title','description','id')

#*Getting list of all posts
class BlogPostListSerializer(serializers.ModelSerializer):
    author = BriefUserSerializer(read_only = True)
    category = BlogCategorySerializer(read_only = True)
    image = serializers.ImageField(max_length=None,allow_empty_file = False,allow_null = True,required = False)
    class Meta:
        model = BlogPost
        fields = ('id','title','description','image','author','category','created_at')

#* Getting one detailed post using its id
class BlogPostDetailSerializer(serializers.ModelSerializer):
    author = BriefUserSerializer(read_only = True)
    image = serializers.ImageField(max_length=None,allow_empty_file = False,allow_null = True,required = False)
    class Meta:
        model = BlogPost
        fields = ('id','title','description','body','image','author','created_at','number_of_comments')

#Comment serializer
class BlogPostCommentSerializer(serializers.ModelSerializer):
    blogpost_connected = BlogPostDetailSerializer(read_only = True)
    class Meta:
        model = BlogPostComment
        fields = ('blogpost_connected','content','posted_at')