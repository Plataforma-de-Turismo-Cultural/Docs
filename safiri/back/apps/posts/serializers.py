from rest_framework import serializers
from .models import Destination, PostCategory, Post, Comment, Like, Review
from apps.users.models import User  # importante se fores relacionar autor etc.


# ========== DESTINATION ==========
class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'


# ========== POST CATEGORY ==========
class PostCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostCategory
        fields = '__all__'


# ========== POST ==========
class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'author_username',
            'title',
            'text',
            'likes',
            'comments_count',
            'is_spam',
            'destination',
            'destination_name',
            'category',
            'category_name',
            'language',
            'metadata',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['likes', 'comments_count', 'created_at', 'updated_at']


# ========== COMMENT ==========
class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'post',
            'author',
            'author_username',
            'text',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


# ========== LIKE ==========
class LikeSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    post_title = serializers.CharField(source='post.title', read_only=True)

    class Meta:
        model = Like
        fields = [
            'id',
            'post',
            'post_title',
            'user',
            'user_username',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


# ========== REVIEW ==========
class ReviewSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'destination',
            'destination_name',
            'author',
            'author_username',
            'rating',
            'title',
            'text',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']
