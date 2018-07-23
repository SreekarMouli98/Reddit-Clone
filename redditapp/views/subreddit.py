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
    lookup_field = 'name'
    lookup_url_kwarg = 'r_name'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SubredditSerializer_detailed
        return SubredditSerializer

class ListSubredditsOfUser(ListAPIView):
    queryset = Subreddit.objects.all()
    serializer_class = SubredditSerializer

    def get_queryset(self):
        return Subreddit.objects.filter(profile__username = self.kwargs['username']).order_by('name')
