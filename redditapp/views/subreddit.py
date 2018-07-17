from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListSubreddits(ListCreateAPIView):
    queryset = Subreddit.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SubredditSerializer_detailed
        if self.request.method == 'POST':
            return SubredditSerializer

class DetailSubreddit(RetrieveUpdateDestroyAPIView):
    queryset = Subreddit.objects.all()
    serializer_class = SubredditSerializer_detailed
    lookup_field = 'name'
    lookup_url_kwarg = 'r_name'
