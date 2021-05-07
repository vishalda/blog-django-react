
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings
from . import views


urlpatterns = [
    path('explore/', views.LoadPosts, name = 'Load Posts')
]