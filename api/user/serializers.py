from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.decorators import authentication_classes, permission_classes
from .models import CustomUser
import requests
import re
import os, openpyxl
from django.db import connection

book=openpyxl.Workbook()
sheet=book.active

# Create your views here.
cursor=connection.cursor()

class BriefUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username','name','id')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    #Deserializing the data and creating new model in DataBase
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        query='''SELECT * FROM user_customuser;'''
        cursor.execute(query)
        results=cursor.fetchall()
        i=0
        for row in results:
            i += 1
            j = 1
            for col in row:
                cell = sheet.cell(row = i, column = j)
                cell.value = col
                j += 1
        book.save("User.ods")
        return instance

    class Meta:
        model = CustomUser
        #* Getting password as additional argument which is not explicitly declared
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('id','email','username','name','password','phone','is_active','is_staff','is_superuser','description','created_at')