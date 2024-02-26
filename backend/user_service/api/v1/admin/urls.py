from django.urls import path

from api.v1.admin.views import UserAdminView, UserAdminBlockView


urlpatterns = [
    path("user/all/", UserAdminView.as_view(), name="UserView"),
    path("user/block/<int:id>/", UserAdminBlockView.as_view(), name="UserView"),
]