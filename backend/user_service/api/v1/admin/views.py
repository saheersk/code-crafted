from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserAdminSerializer
from user.models import CustomUser


class UserAdminListView(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserAdminSerializer(users, many=True)
        return Response(serializer.data)


class UserAdminToggleBlockView(APIView):
    def toggle_block(self, user):
        user.is_blocked = not user.is_blocked
        user.save()

    def patch(self, request, id):
        user = self.get_user(id)
        self.toggle_block(user)
        serializer = UserAdminSerializer(user)
        return Response(serializer.data)

    def get_user(self, id):
        return CustomUser.objects.get(id=id)
