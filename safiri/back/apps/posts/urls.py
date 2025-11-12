from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    DestinationViewSet,
    PostCategoryViewSet,
    PostViewSet,
    CommentViewSet,
    LikeViewSet,
    ReviewViewSet,
    PostListCreateView,
)

router = DefaultRouter()
router.register(r'destinations', DestinationViewSet)
router.register(r'categories', PostCategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'reviews', ReviewViewSet)
urlpatterns = router.urls
""" urlpatterns = [
    path('', include(router.urls)),
] """
urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
]