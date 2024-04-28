from django.contrib import admin
from django.urls import path, include

import Main.urls as main_urls
import Users.urls as user_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include(user_urls.user_router.urls)),
    path("", include(main_urls.urlpatterns)),
]
