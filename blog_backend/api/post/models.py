from django.db import models
from api.user.models import CustomUser

class BlogCategory(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()   

    def __str__(self):
        return self.title

#*Post Model
class BlogPost(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    body = models.TextField()
    image = models.ImageField(upload_to = 'images/',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(BlogCategory,related_name='category', on_delete=models.CASCADE,null=True)
    author = models.ForeignKey(CustomUser,related_name='post',on_delete=models.CASCADE)

    def __str__(self):
        return self.title

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