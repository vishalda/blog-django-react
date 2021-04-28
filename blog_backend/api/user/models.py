from django.db import models
from django.contrib.auth.models import AbstractUser

# !This model is just for testing and can be changed to increase the efficiency and the security
class Users(AbstractUser):
    name = models.CharField(max_length=50, default='Anonymous')
    username = models.CharField(max_length=30,unique=True)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=30)
    session_token = models.CharField(max_length=10,default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = []