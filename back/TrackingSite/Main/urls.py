from django.urls import path
from rest_framework.routers import DefaultRouter

from Main.views import RegionViewSet, VoicesViewSet

region_router = DefaultRouter()
region_router.register("api/v1/regions", RegionViewSet)
voice_router = DefaultRouter()
voice_router.register("api/v1/voices", VoicesViewSet)
urlpatterns = [*region_router.urls,
               *voice_router.urls,
               # path("api/v1/verify_number", verify_code)
               ]
