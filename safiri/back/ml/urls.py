from django.urls import path, include
from . import views
from .views import GenerateItineraryView



urlpatterns = [
    path("classify", views.ClassifyTextView, name="classify-text"),
    path("recommendations/<int:user_id>/", views.RecommendPostsView, name="recommend-posts"),
    path("generate_itinerary/", GenerateItineraryView.as_view(), name="generate_itinerary"),
    path("api/ml/", include("ml.urls")),

]
