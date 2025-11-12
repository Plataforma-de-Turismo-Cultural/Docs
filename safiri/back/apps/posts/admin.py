from django.contrib import admin
from .models import Destination, PostCategory, Post, Comment, Like, Review

# Register your models here.


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'lat', 'lng', 'created_at')
    search_fields = ('name', 'country')
    list_filter = ('country',)
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(PostCategory)
class PostCategoryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'description', 'created_at')
    search_fields = ('code', 'name')
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'author',
        'category',
        'destination',
        'likes',
        'comments_count',
        'is_spam',
        'created_at',
    )
    search_fields = ('title', 'text', 'author__username')
    list_filter = ('is_spam', 'language', 'category', 'destination')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ('author', 'category', 'destination')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'text', 'created_at')
    search_fields = ('text', 'author__username', 'post__title')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ('author', 'post')


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'created_at')
    search_fields = ('post__title', 'user__username')
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ('post', 'user')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('destination', 'author', 'rating', 'title', 'created_at')
    search_fields = ('destination__name', 'author__username', 'title', 'text')
    list_filter = ('rating', 'destination', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ('destination', 'author')
