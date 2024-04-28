import os
import re
from random import randint
from uuid import uuid4

import requests
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from Main.models import VerifyRequest
from Users.models import User
from django.contrib.auth import get_user_model
UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    def create(self, validated_data):
        phone_number = validated_data["phone_number"]
        verify_code = ""
        for i in range(5):
            verify_code += str(randint(0, 9))
        VerifyRequest.objects.create(phone_number=phone_number, verify_code=verify_code)
        requests.post(f"https://smsc.ru/sys/send",
                      data={
                            "login": os.environ["LOGIN_SMSC"],
                            "psw": os.environ["PASS_SMSC"],
                            "phones": phone_number,
                            "mes": f"Ваш код подтверждения для регистрации на TrackingSite:\n"
                                   f"{verify_code}"
                      })
        user_token = uuid4()
        user = UserModel(**validated_data, token=user_token, is_active=False)
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ["first_name", "last_name", "phone_number", "email", "date_of_birth",
                  "location", "gender", "password"]
