from rest_framework import serializers
from .models import Agency, BiodiversityEntry, HistoricalSite


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = [
            'id',
            'name',
            'website',
            'contact_email',
            'description',
            'created_at',
            'updated_at',
            'deleted_at',
        ]


class BiodiversityEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BiodiversityEntry
        fields = [
            'id',
            'scientific_name',
            'common_name',
            'description',
            'location',
            'created_at',
            'updated_at',
            'deleted_at',
        ]


class HistoricalSiteSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = HistoricalSite
        fields = [
            'id',
            'name',
            'description',
            'established_year',
            'destination',
            'destination_name',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
