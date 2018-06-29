from rest_framework import serializers
from redditapp.models import *

class SubredditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subreddit
        fields = '__all__'
