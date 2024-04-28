from uuid import uuid4

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, password, **other_fields)

    def create_user(self, email, first_name, password, **other_fields):

        if not email:
            raise ValueError('You must provide an email address')

        email = self.normalize_email(email)
        user = self.model(email=email,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser):
    class GenderChoice(models.TextChoices):
        male = "М", "Мужчина"
        female = "Ж", "Женщина"

    objects = CustomAccountManager()
    first_name = models.CharField("first name", max_length=25)
    last_name = models.CharField("last name", max_length=25)
    username = None
    phone_number = models.CharField(unique=True)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    location = models.CharField()
    gender = models.CharField(choices=GenderChoice.choices)
    money = models.IntegerField(default=0)
    token = models.UUIDField(unique=True, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number", "date_of_birth",
                       "location", "gender"]

    def __str__(self):
        return f"{self.email} - {self.first_name} {self.last_name}"
