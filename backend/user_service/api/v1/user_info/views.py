# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status

# from .serializers import CustomUserSerializer


# class UserView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         user = request.user

#         serializer = CustomUserSerializer(user)

#         return Response(serializer.data)

#     def put(self, request, *args, **kwargs):
#         user = request.user

#         serializer = CustomUserSerializer(user, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import CustomUserSerializer

# Command interface
class Command:
    def execute(self, *args, **kwargs):
        pass

# Concrete command for handling GET requests
class GetUserCommand(Command):
    def execute(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

# Concrete command for handling PUT requests
class UpdateUserCommand(Command):
    def execute(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Invoker class responsible for invoking commands
class CommandInvoker:
    def __init__(self, command):
        self.command = command

    def execute_command(self, request, *args, **kwargs):
        return self.command.execute(request, *args, **kwargs)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        command = GetUserCommand()
        invoker = CommandInvoker(command)
        return invoker.execute_command(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        command = UpdateUserCommand()
        invoker = CommandInvoker(command)
        return invoker.execute_command(request, *args, **kwargs)

