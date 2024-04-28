from django.contrib import admin

from Main.models import Voice, Region
from Users.models import User

admin.register(User, Voice, Region)

