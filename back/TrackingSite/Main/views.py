from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, renderer_classes, api_view
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.viewsets import ModelViewSet

from Main.models import Region, Voice, VerifyRequest, District
from Main.serializers import RegionSerializer, VoicesSerializer
from Users.models import User

from Main.serializers import DistrictSerializer


class DistrictViewSet(ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer


class RegionViewSet(ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

    @action(methods=("GET",), detail=False)
    def get_top_10(self, request):
        regions = Region.objects.order_by("count_voices")[:10]
        return Response(status=200, data={"regions": regions})

    # authentication_classes = [TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]


class VoicesViewSet(ModelViewSet):
    queryset = Voice.objects.all()
    serializer_class = VoicesSerializer

    # authentication_classes = [TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'], name='Get Voice by Region')
    def get_by_user(self, request, *args, **kwargs):
        token = request.get("token")
        if not token:
            return Response(status=400, data="Не указан токен!")
        try:
            user = get_user_model().objects.get(token=token)
        except:
            return Response(status=400, data="Невалидный токен!")
        voices = Voice.objects.filter(user_id=user.id)
        return Response(status=200, data={"voices": voices})

    @action(detail=False, methods=['GET'], name='Get Voice by Region')
    def get_by_region(self, request, *args, **kwargs):
        region_name = request.data.get("region")
        if not region_name:
            return Response(status=400, data="Ошибка! Не указан регион!")
        try:
            region = Region.objects.get(name=region_name)
        except:
            return Response(status=400, data="Несуществующий регион!")
        try:
            voice = Voice.objects.get(region_id=region.id)
            return Response(status=200, data={"voice": voice})
        except:
            return Response(status=400, data="За данный регион пока никто не проголосовал")

    @action(detail=False, methods=['PATCH'], name='Give Voice')
    def voice(self, request, *args, **kwargs):
        try:
            user = get_user_model().objects.get(token=request.data["token"])
        except:
            return Response(status=400, data="Невалидный токен!")
        region_name = request.data.get("region")
        region = Region.objects.get(name=region_name)
        district_name = request.data.get("district")
        if not region:
            try:
                district = District.objects.get(name=district_name)
            except:
                district = District.objects.create(name=district_name)
            region = Region.objects.create(name=region_name, district=district)
        try:
            voice = Voice.objects.get(user_id=user)
        except:
            voice = Voice.objects.create(user=user, region=region)
        voice.is_active = True
        voice.region = region
        region.count_voices += 1
        voice.save()
        region.save()
        return Response(status=200, data="Голос успешно оставлен!")
