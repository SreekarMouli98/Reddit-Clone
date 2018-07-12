from rest_framework import serializers
from redditapp.models import *
from redditapp.serializers import ProfileSerializer, SubredditSerializer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostSerializer_detailed(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        depth = 1