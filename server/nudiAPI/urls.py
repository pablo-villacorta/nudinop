# myapi/urls.py
from django.conf.urls import url 
from . import views 
 
urlpatterns = [ 
    url(r'^nudiAPI/prediction$', views.prediction),

]
