from django.shortcuts import render
from django.views import View
from django.http import JsonResponse,HttpResponse, HttpResponseNotFound
import os

# * Testing API by sending JsonResponse
def test1(request):
    return JsonResponse({'info':'Testing api - 1','TestCount':'1'})

class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()