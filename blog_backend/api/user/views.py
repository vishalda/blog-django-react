
from django.http import JsonResponse
from django.http import HttpResponse
import random

#Generating Session tokens
def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr[i] for i in range(97,123)] + [str[i] for i in range(10)])  for _ in range(length))

# * Testing API by sending JsonResponse
def test2(request):
    pass