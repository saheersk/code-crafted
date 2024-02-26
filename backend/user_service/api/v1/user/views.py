# from django.contrib.auth import authenticate, login
# from django.core.exceptions import ObjectDoesNotExist

# from rest_framework import status
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.tokens import RefreshToken

# from .serializers import LoginSerializer, RegisterSerializer
# from .tasks import send_otp_task
# from .utils import generate_and_store_otp, verify_otp
# from user.models import CustomUser

# # from .producer import send_login_message, send_signup_message


# @permission_classes([AllowAny])
# class Login(APIView):
#     def post(self, request):
#         data = request.data
#         serializer = LoginSerializer(data=data)

#         if not serializer.is_valid():
#             return Response({
#                 'status': False,
#                 'message': "Invalid credentials"
#             }, status=status.HTTP_400_BAD_REQUEST)
        
#         email = serializer.validated_data['email']
#         password = serializer.validated_data['password']
    
#         user = authenticate(request, email=email, password=password)
        
#         if not user:
#             return Response({
#                 'status': False,
#                 'message': "Invalid credentials"
#             }, status=status.HTTP_400_BAD_REQUEST)

#         if user.is_blocked:
#             return Response({
#                 'status': False,
#                 'message': "Your account is blocked. Please contact the administrator."
#             }, status=status.HTTP_403_FORBIDDEN)

#         login(request, user)
#         refresh = RefreshToken.for_user(user)

#         return Response({
#             'status': True,
#             'message': 'User logged in successfully',
#             'token': {
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token) 
#             },
#             'username': request.user.username,
#             'user_id': user.id,
#             'email': user.email,
#             "role": user.role
#         }, status=status.HTTP_200_OK)

# @permission_classes([AllowAny])
# class Register(APIView):

#     def post(self, request):
#         data = request.data
#         print(data, "============")
#         serializer = RegisterSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()

#             validated_data = serializer.validated_data
#             email = validated_data.get('email')

#             user = CustomUser.objects.get(email=email)
            
#             print(user.id, validated_data, "=====================id")

#             return Response({
#                 'status': True,
#                 'user_id': user.id,
#                 'message': 'user created successfully'
#             }, status=status.HTTP_201_CREATED)
#         else:
#             return Response({
#                 'status': False,
#                 'message': serializer.errors
#             }, status=status.HTTP_400_BAD_REQUEST)
        

# class OTPVerification(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         user_id = request.data.get('user_id')
#         otp = request.data.get('otp')

#         print(otp, user_id, "==========otp user_id==========")

#         result = verify_otp(user_id, otp)

#         if result:
#             user = CustomUser.objects.get(id=user_id)

#             user.is_active = True
#             user.save()

#             if user:
#                 login(request, user)

#                 refresh = RefreshToken.for_user(user)

#                 return Response({
#                     'status': True,
#                     'message': 'User authenticated successfully',
#                     'token': {
#                         'refresh': str(refresh),
#                         'access': str(refresh.access_token)
#                     },
#                     'username': user.username,
#                     'user_id': user.id,
#                     'email': user.email,
#                     'role': user.role
#                 }, status=status.HTTP_200_OK)
#             else:
#                 return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

# class OTPResend(APIView):
#     def post(self, request):
#         user_id = request.data.get('user_id')

#         try:
#             user = CustomUser.objects.get(id=user_id)
#         except ObjectDoesNotExist:
#             return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
#         user.is_active = True
#         user.save()

#         otp = generate_and_store_otp(user_id)
#         print("============", otp, "============ otp")
#         send_otp_task.delay(user.email, otp)

#         return Response({'message': 'Otp resend'}, status=status.HTTP_200_OK)


from django.contrib.auth import authenticate, login
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, RegisterSerializer
from .tasks import send_otp_task
from .utils import generate_and_store_otp, verify_otp
from user.models import CustomUser


# Using Factory Method Pattern to create authentication methods
class AuthMethodFactory:
    @staticmethod
    def get_auth_method(data):
        if 'otp' in data:
            return OTPAuthentication(data)
        else:
            return PasswordAuthentication(data)


# Abstract class for different authentication methods
class AuthenticationMethod:
    def __init__(self, data):
        self.data = data

    def authenticate(self):
        pass


# Concrete class for OTP authentication
class OTPAuthentication(AuthenticationMethod):
    def authenticate(self):
        user_id = self.data.get('user_id')
        otp = self.data.get('otp')
        result = verify_otp(user_id, otp)

        if result:
            user = CustomUser.objects.get(id=user_id)
            user.is_active = True
            user.save()
            return user
        return None


# Concrete class for password authentication
class PasswordAuthentication(AuthenticationMethod):
    def authenticate(self):
        email = self.data.get('email')
        password = self.data.get('password')
        return authenticate(email=email, password=password)


@permission_classes([AllowAny])
class Login(APIView):
    def post(self, request):
        data = request.data
        authentication_method = AuthMethodFactory.get_auth_method(data)
        user = authentication_method.authenticate()

        if not user:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_blocked:
            return Response({'message': 'Your account is blocked'}, status=status.HTTP_403_FORBIDDEN)

        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({'token': str(refresh.access_token)}, status=status.HTTP_200_OK)


@permission_classes([AllowAny])
class Register(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id, 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerification(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_id')
        otp = request.data.get('otp')
        authentication_method = AuthMethodFactory.get_auth_method(request.data)
        user = authentication_method.authenticate()

        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({'token': str(refresh.access_token)}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)


class OTPResend(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user = CustomUser.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.is_active = True
        user.save()

        otp = generate_and_store_otp(user_id)
        send_otp_task.delay(user.email, otp)
        return Response({'message': 'Otp resent'}, status=status.HTTP_200_OK)
