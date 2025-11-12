from django.contrib import admin
from .models import Agency, BiodiversityEntry, HistoricalSite

# Register your models here.

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'contact_email', 'created_at', 'updated_at')
    search_fields = ('name', 'contact_email')
    list_filter = ('created_at',)
    ordering = ('-created_at',)


@admin.register(BiodiversityEntry)
class BiodiversityEntryAdmin(admin.ModelAdmin):
    list_display = ('scientific_name', 'common_name', 'location', 'created_at')
    search_fields = ('scientific_name', 'common_name', 'location')
    list_filter = ('location', 'created_at')
    ordering = ('-created_at',)


@admin.register(HistoricalSite)
class HistoricalSiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'established_year', 'destination', 'created_at')
    search_fields = ('name', 'destination__name')
    list_filter = ('established_year', 'destination')
    ordering = ('-created_at',)
