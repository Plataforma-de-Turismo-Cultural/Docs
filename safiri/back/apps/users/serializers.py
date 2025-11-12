from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


# ========== USER SERIALIZER ==========
class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'display_name',
            'full_name',
            'bio',
            'avatar',
            'phone',
            'organisation',
            'role',
            'is_agency',
            'is_active',
            'date_joined',
        ]
        read_only_fields = ['is_active', 'date_joined']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()


# ========== USER PROFILE SERIALIZER ==========
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    favourites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'user',
            'location',
            'favourites',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'deleted_at']
