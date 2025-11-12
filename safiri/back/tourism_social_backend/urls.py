"""
URL configuration for tourism_social_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import JsonResponse


'''
def home(request):
    return JsonResponse({"message": "🌍 Tourism Social API is running!"})
'''

urlpatterns = [
     # Painel de administração
    path('admin/', admin.site.urls),

    # APIs do backend
    path('api/core/', include('apps.core.urls')),
    path('api/posts/', include('apps.posts.urls')),
    path('api/users/', include('apps.users.urls')),
    path("api/ml/", include("ml.urls")),
    path('api/', include('apps.posts.urls')),
    
  

    # e deve ignorar as rotas começando com "admin" ou "api"
    re_path(r'^(?!admin|api).*$', TemplateView.as_view(template_name='index.html')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

