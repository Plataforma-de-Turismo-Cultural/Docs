import uuid
from django.db import models


# ✅ Modelo base para auditoria
class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)  # Data de criação
    updated_at = models.DateTimeField(auto_now=True)      # Última atualização
    deleted_at = models.DateTimeField(null=True, blank=True)  # Exclusão lógica

    class Meta:
        abstract = True  # Não cria tabela para esta classe

# Create your models here.
class Agency(BaseModel):
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True)
    contact_email = models.EmailField(blank=True)
    description = models.TextField(blank=True)


class BiodiversityEntry(BaseModel):
    scientific_name = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True) # e.g. province


class HistoricalSite(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    established_year = models.IntegerField(null=True, blank=True)
    destination = models.ForeignKey('posts.Destination', null=True, blank=True, on_delete=models.SET_NULL)