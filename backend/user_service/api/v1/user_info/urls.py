from django.urls import path

from api.v1.user_info.views import UserView


urlpatterns = [
    path("", UserView.as_view(), name="UserView"),
]