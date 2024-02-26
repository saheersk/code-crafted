from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user-service/api/v1/auth/', include("api.v1.user.urls")),
    path('user-service/api/v1/info/', include("api.v1.user_info.urls")),
    path('user-service/api/v1/admin/', include("api.v1.admin.urls")),
]

if settings.DEBUG:
    urlpatterns += (
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) +
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    )