from django.db import models
from api.user.models import CustomUser

#*Post Model
class BlogPost(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=100)
    body = models.TextField()
    image = models.ImageField(upload_to = 'images/',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(CustomUser,related_name='post',on_delete=models.CASCADE)

    def __str__(self):
        return self.title;

    #Getting the number of comments
    @property
    def number_of_comments(self):
        return BlogPostComment.objects.filter(blogpost_connected=self).count()

#*Comment Model
class BlogPostComment(models.Model):
    blogpost_connected = models.ForeignKey(BlogPost,on_delete=models.CASCADE,related_name='comments')
    author = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.author)+", "+self.blogpost_connected.title[:40]

class BlogPostLike(models.Model):
    blogpost_connected = models.ForeignKey(BlogPost,on_delete=models.CASCADE,related_name='likes')
    author = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.author)+", "+self.blogpost_connected.title[:40]