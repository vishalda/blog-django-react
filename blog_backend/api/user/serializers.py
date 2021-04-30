from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permissions_classes

from .models import CustomUser

class UsersSerializer(serializers.HyperlinkedModelSerializer):
    #Deserializing the data and creating new model in DataBase
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    #Deserializing the data and updating an existing model in DataBase
    def update(self,instance,validated_data):
        for attr, value in validated_data.items():
            if attr = "password":
                instance.set_password(value)
            else:
                setattr(instance,attr,value)

        instance.save()
        return instance

    class Meta:
        model = CustomUser
        #* Getting password as additional argument which is not explicitly declared
        extra_kwargs = {'password': {'write_only': True}}
        field = ('email','name','password','phone','is_active','is_staff','is_superuser')

