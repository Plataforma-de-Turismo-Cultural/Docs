import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.core.models import BaseModel

# Create your models here.


class Destination(BaseModel):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)


    def __str__(self):
        return self.name


class PostCategory(BaseModel):
    code = models.CharField(max_length=50, unique=True)   # ex: "feedback", "recommendation"
    name = models.CharField(max_length=100)               # ex: "Feedback", "Recommendation"
    description = models.TextField(blank=True)

    # class Meta:
        # db_table = 'pst_category'

    def __str__(self):
        return self.name


class Post(BaseModel):
    author = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255, blank=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    is_spam = models.BooleanField(default=False)
    destination = models.ForeignKey(Destination, null=True, blank=True, on_delete=models.SET_NULL, related_name='posts')
    category = models.ForeignKey(PostCategory, null=True, blank=True, on_delete=models.SET_NULL, related_name='posts')
    language = models.CharField(max_length=10, default='pt')
    metadata = models.JSONField(default=dict, blank=True)
    video = models.FileField(upload_to='videos/')



    class Meta:
        indexes = [
        models.Index(fields=['created_at']),
        models.Index(fields=['author']),
        models.Index(fields=['category']),
        ]


        def __str__(self):
            return f"Post {self.id} by {self.author.username}"


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey('users.User', on_delete=models.CASCADE)
    text = models.TextField()
    #created_at = models.DateTimeField(auto_now_add=True)


class Like(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes_set')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    #created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('post', 'user')


class Review(BaseModel):
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    author = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])  # Ex: 1 a 5 estrelas
    title = models.CharField(max_length=255, blank=True)
    text = models.TextField(blank=True)
    #created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pst_review'
        indexes = [
            models.Index(fields=['destination']),
            models.Index(fields=['author']),
            models.Index(fields=['rating']),
        ]
        ordering = ['-created_at']
        unique_together = ('destination', 'author')  # evita review duplicado do mesmo user

    def __str__(self):
        return f"Review {self.rating}★ by {self.author.username} on {self.destination.name}", self.title
