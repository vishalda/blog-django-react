from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register(r'',views.PostViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('post/<int:id>/',views.PostDetail,name="post")
]