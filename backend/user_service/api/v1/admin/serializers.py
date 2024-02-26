from rest_framework import serializers

from user.models import CustomUser


class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_blocked']
