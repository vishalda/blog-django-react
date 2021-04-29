from django.contrib import admin
from .models import CustomUser

# Register your models here.

#TODO : Need to serialize before migrating user models to DB
admin.site.register(CustomUser)