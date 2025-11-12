import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.core.models import BaseModel

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    display_name = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    organisation = models.CharField(max_length=120, blank=True)
    role = models.CharField(max_length=100, blank=True)
    is_agency = models.BooleanField(default=False)

    #class Meta:
        #db_table = 'usr_user'

    def __str__(self):
        return self.display_name or self.username


class UserProfile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    location = models.CharField(max_length=200, blank=True)
    favourites = models.ManyToManyField('posts.Post', blank=True, related_name='fav_by')

    def __str__(self):
        return f"Profile {self.user.username}"