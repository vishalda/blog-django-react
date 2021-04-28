from django.http import JsonResponse

# * Testing API by sending JsonResponse
def test3(request):
    return JsonResponse({'info':'Testing api - 3','TestCount ':'3'})