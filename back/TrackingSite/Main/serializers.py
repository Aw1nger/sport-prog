from rest_framework.serializers import ModelSerializer

from Main.models import Region, Voice, District


class DistrictSerializer(ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"


class RegionSerializer(ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"


class VoicesSerializer(ModelSerializer):
    class Meta:
        model = Voice
        fields = "__all__"

