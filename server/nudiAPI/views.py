from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework import status

from .serializers import BlacklistSerializer
from .models import Blacklist

from rest_framework.decorators import api_view



from predModule.prediction import *

model = load_model("models/nsfw_mobilenet2.224x224.h5")

@api_view(['GET', 'POST', 'DELETE'])
def prediction(request):
    urls = JSONParser().parse(request)["urls"]
    if urls[0] == '':
        return JsonResponse({'error': "empty url"}, status = status.HTTP_200_OK)

    preds = classify(model, urls, image_dim=(224, 224))
    
    

    if request.method == 'POST':
        return JsonResponse(preds, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({'message': 'Bad Response Pa'}, status = status.HTTP_204_NO_CONTENT)
