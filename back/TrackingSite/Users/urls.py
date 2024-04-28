from django.urls import path
from rest_framework import routers

from Users.views import UsersViewSet

user_router = routers.DefaultRouter()
# user_router.register("api/v1", UsersViewSet.as_view({
#     "get": "list", "post": "add", "patch": "edit"
#     , "put": "detail", "delete": "delete"}), basename="users")
user_router.register("api/v1/users", UsersViewSet)
# urlpatterns = [path("api/v1/users/login", UserLogin.as_view()),
#                *user_router.urls]
