#from django.shortcuts import render
from django.http import JsonResponse

# * Testing API by sending JsonResponse
def test1(request):
    return JsonResponse({'info':'Testing api - 1','TestCount':'1'})