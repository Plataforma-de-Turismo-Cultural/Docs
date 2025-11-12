from django.contrib import admin
from .models import User, UserProfile

# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'display_name', 'role', 'is_agency', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'display_name', 'role')
    list_filter = ('is_agency', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at')
    search_fields = ('user__username', 'location')
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ('user', 'favourites')
