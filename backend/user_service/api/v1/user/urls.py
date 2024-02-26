from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from rest_framework_social_oauth2.views import TokenView, ConvertTokenView, RevokeTokenView

from api.v1.user.views import Login, Register, OTPVerification, OTPResend

urlpatterns = [
    #Authentication
    path("login/", Login.as_view(), name="login"),
    path("register/", Register.as_view(), name="register"),

    #otp
    path('otp/resend/', OTPResend.as_view(), name='otp-resend'),
    path('verify-otp/', OTPVerification.as_view(), name='otp-verification'),

    #Token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]