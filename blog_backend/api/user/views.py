from django.http import JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import CustomUser
from .serializers import UserSerializer
from django.contrib.auth import get_user_model,login,logout
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
import re
import json
import random

#Generating Session tokens
def generateSessionToken(length=10):
    return ''.join(random.SystemRandom().choice([chr(i)  for i in range(97,123)] + [str(i) for i in range(10)]) for _ in range(length))

def validateRequest(email,username,password):
    #Checking valid email address using regex
    if not re.match('\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b',str(email)):
        return JsonResponse({'error':'Please enter a valid email address'})
    
    #Checking valid username using regex
    if not re.match('^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$',str(username)):
        return JsonResponse({'error':'Please enter a valid username'})

    #Checking length of password
    if len(password) < 4:
        return JsonResponse({'error':'Password length should not be less than 4'})

@csrf_exempt
def signin(request):
    #Check if request is in POST method
    if not request.method == 'POST':
        return JsonResponse({'error':'Accepting only POST request'})
    
    #*Use request.POST for form-encoded data 
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']

    #Check for correctness
    validateRequest(email,username,password)
    UserModel = get_user_model()
    try:
        #Check if User with specified email exists, continue if exists else raise exception
        user = UserModel.objects.get(email = email)
        #Comparing of password with already existing password in database
        if user.check_password(password) and user.username == username:
            usrDict = UserModel.objects.filter(email = email).values().first()
            usrDict.pop('password')
            #Checking if Session token exists already, if exists then raise an error and remove session token
            if user.session_token !="0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error':'Previous session exists! Please login again'})
            #Generating token for loggin in
            token = generateSessionToken()
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({'token':token,'user':usrDict})
        else:
            return JsonResponse({'error':'Invalid Credentials'})
    
    #Raising an exception for not matching of email ID
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid email'})

@csrf_exempt
def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk = id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid user ID'})

    return JsonResponse({'success':'Logout succes'})

class UserViewSet(viewsets.ModelViewSet):
    #Allowing anyone permission for this viewset
    permission_classes_by_action = {'create':[AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
            