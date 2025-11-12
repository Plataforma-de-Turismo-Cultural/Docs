# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Agency, BiodiversityEntry, HistoricalSite
from .serializers import (
    AgencySerializer,
    BiodiversityEntrySerializer,
    HistoricalSiteSerializer,
)

# 🔹 Visualização para agências
class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all().order_by('-created_at')
    serializer_class = AgencySerializer
    permission_classes = [permissions.AllowAny]  # ou [permissions.IsAuthenticated]


# 🔹 Visualização para biodiversidade
class BiodiversityEntryViewSet(viewsets.ModelViewSet):
    queryset = BiodiversityEntry.objects.all().order_by('-created_at')
    serializer_class = BiodiversityEntrySerializer
    permission_classes = [permissions.AllowAny]


# 🔹 Visualização para sítios históricos
class HistoricalSiteViewSet(viewsets.ModelViewSet):
    queryset = HistoricalSite.objects.select_related('destination').all().order_by('-created_at')
    serializer_class = HistoricalSiteSerializer
    permission_classes = [permissions.AllowAny]
