
from django.http import JsonResponse

# * Testing API by sending JsonResponse
def test2(request):
    return JsonResponse({'info':'Testing api - 2','TestCount':'2'})