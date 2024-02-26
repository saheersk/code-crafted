from django.core.validators import RegexValidator

from rest_framework import serializers

from user.models import CustomUser
from .tasks import send_otp_task
from .utils import generate_and_store_otp


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField() 
    password = serializers.CharField()
    confirm_password = serializers.CharField()
    phone_number = serializers.CharField(validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")])
    is_hr = serializers.BooleanField(default=False)
    github = serializers.CharField(required=False, allow_blank=True)
    linkedin = serializers.CharField(required=False, allow_blank=True)
    organization = serializers.CharField(required=False)

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")

        data.pop('confirm_password')

        if not data.get('first_name'):
            raise serializers.ValidationError("First name is required.")
        if not data.get('last_name'):
            raise serializers.ValidationError("Last name is required.")
        if not data.get('username'):
            raise serializers.ValidationError("Username is required.")
        if CustomUser.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError("Username is already taken.")
        if not data.get('email'):
            raise serializers.ValidationError("Email is required.")
        if CustomUser.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError("Email is already taken.")
        if not data.get('password'):
            raise serializers.ValidationError("Password is required.")
        if not data.get('phone_number'):
            raise serializers.ValidationError("Phone number is required.")
        if CustomUser.objects.filter(phone_number=data.get('phone_number')).exists():
            raise serializers.ValidationError("Phone number is already registered.")
        
        data['github'] = data.get('github', '')
        data['linkedin'] = data.get('linkedin', '')
        data['organization'] = data.get('organization', '')
        data['is_hr'] = data.get('is_hr', False)

        return data


    def create(self, validated_data):
        organization=''
        role='user'

        if validated_data['is_hr']:
            organization = validated_data['organization']
            role='hr'
        
        github=validated_data['github']
        linkedin=validated_data['linkedin']

        user = CustomUser.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            organization=organization,
            role=role,
            github=github,
            linkedin=linkedin
        )
        print("Plain text password:", validated_data['password'])
        user.set_password(validated_data['password'])
        user.save()

        user.is_active = False
        user.save()

        print(validated_data, "validated=================")

        otp = generate_and_store_otp(user.id)
        print("============", otp, "============ otp")
        send_otp_task.delay(user.email, otp)

        return validated_data


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email:
            raise serializers.ValidationError("email is required.")
        if not password:
            raise serializers.ValidationError("Password is required.")

        if not CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("User not Found.")

        return data
