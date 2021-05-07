from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
#router.register(r'comment/{id}',views.CommentViewSet)
router.register(r'post',views.PostDetailViewSet)
router.register(r'',views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('comment/<int:id>/',views.Comment)
]