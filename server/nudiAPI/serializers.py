# serializers.py
from rest_framework import serializers

from .models import Blacklist

class BlacklistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Blacklist
        fields = ('name', 'email')