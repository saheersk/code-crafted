from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from django_otp.models import SideChannelDevice

from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)
        

class CustomUser(AbstractUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
        ('hr', 'HR'),
    ]


    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = PhoneNumberField(unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='user')
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    organization = models.CharField(max_length=100, blank=True, null=True)
    join_date = models.DateTimeField(auto_now_add=True)
    is_blocked = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"