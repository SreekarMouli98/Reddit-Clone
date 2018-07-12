from rest_framework import serializers
from redditapp.models import *

class SubredditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subreddit
        fields = '__all__'

class SubredditSerializer_detailed(serializers.ModelSerializer):
    class Meta:
        model = Subreddit
        fields = '__all__'
        depth = 1