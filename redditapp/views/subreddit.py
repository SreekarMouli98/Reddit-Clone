from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListSubreddits(ListCreateAPIView):
    queryset = Subreddit.objects.all()
    serializer_class = SubredditSerializer

class DetailSubreddit(RetrieveUpdateDestroyAPIView):
    queryset = Subreddit.objects.all()
    serializer_class = SubredditSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'r_id'
