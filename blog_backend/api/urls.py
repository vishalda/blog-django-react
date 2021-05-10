
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings
from .views import test1

urlpatterns = [
    path('', test1 , name = 'api.test1'),
    path('user/',include('api.user.urls')),
    path('post/',include('api.post.urls')),
]