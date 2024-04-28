from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import permissions, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication


from Main.models import VerifyRequest
from .models import User
from .serializers import UserSerializer


class UsersViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    fields = ("username",)
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]\

    @action(methods=("POST",), detail=False, url_path="verify_number")
    def verify_number(self, request):
        phone_number = request.data.get("phone_number")
        verify_code = request.data.get("verify_code")
        user = get_user_model().objects.get(phone_number=phone_number)
        verify_request = VerifyRequest.objects.get(phone_number=phone_number)
        print(verify_request, user)
        print(type(verify_request.verify_code))
        if verify_code == verify_request.verify_code:
            user.is_active = True
            user.save()
            return Response(status=200, data="OK!")
        raise ValidationError(code=405, detail="Invalid code!")

    @action(methods=("POST",), detail=False, url_path="login")
    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_model = get_user_model()
        user = user_model.objects.get(email=email)
        # if not user.is_active:
        #     return Response(status=403, data="Номер телефона не подтверждён!")
        print(password)
        if user.check_password(raw_password=password):
            print(True)
            return Response(status=200,
                            data={
                                "email": user.email,
                                "first_name": user.first_name,
                                "last_name": user.last_name,
                                "token": user.token
                            })
        return Response(status=403, data="Неправильный пароль")
