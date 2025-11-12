from rest_framework.routers import DefaultRouter
from .views import AgencyViewSet, BiodiversityEntryViewSet, HistoricalSiteViewSet

router = DefaultRouter()
router.register(r'agencies', AgencyViewSet, basename='agency')
router.register(r'biodiversity', BiodiversityEntryViewSet, basename='biodiversity')
router.register(r'historical-sites', HistoricalSiteViewSet, basename='historical-site')

urlpatterns = router.urls
