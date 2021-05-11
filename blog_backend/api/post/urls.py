from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register(r'view',views.PostDetailViewSet)
router.register(r'',views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('category/<int:id>/',views.LoadRelatedPost),
    path('comment/<int:id>/',views.LoadComment),
    path('create-post/<int:id>/',views.CreatePost),
    path('create-comment/<int:author_id>/<int:blog_id>/',views.CreateComment),
    path(r'update-post/<int:post_id>/',views.UpdatePost)
]