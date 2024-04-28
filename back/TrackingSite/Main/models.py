from django.db import models


class District(models.Model):
    # id = models.IntegerField(primary_key=True, auto_created=True)
    name = models.CharField()


class Region(models.Model):
    name = models.CharField()
    district = models.ForeignKey("District", models.PROTECT)
    count_voices = models.IntegerField(default=0)


class Voice(models.Model):
    # id = models.IntegerField(primary_key=True, auto_created=True)
    region = models.ForeignKey("Region", models.CASCADE)
    is_active = models.BooleanField(default=False)
    user = models.ForeignKey("Users.User", models.PROTECT)


class VerifyRequest(models.Model):
    phone_number = models.CharField()
    verify_code = models.IntegerField()

