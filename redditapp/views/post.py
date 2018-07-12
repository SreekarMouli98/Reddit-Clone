from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListAllPosts(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class ListPopularPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.order_by('-votes')

class ListPostsOfReddit(ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(subreddit__name=self.kwargs['r_name'])

class DetailPostOfReddit(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer_detailed

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'subreddit__name': self.kwargs['r_name'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)        

class ListPostsOfUser(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(profile__username=self.kwargs['username'])

class DetailPostsOfUser(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer_detailed

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'profile__username': self.kwargs['username'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)      