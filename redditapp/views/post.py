from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListAllPosts(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer_detailed

    def get_queryset(self):
        return Post.objects.order_by('-updated_at', '-votes')

class ListPopularPosts(ListAPIView):
    serializer_class = PostSerializer_detailed

    def get_queryset(self):
        return Post.objects.order_by('-votes', '-updated_at')

class ListPostsOfReddit(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PostSerializer_detailed
        if self.request.method == 'POST':
            return PostSerializer

    def get_queryset(self):
        return Post.objects.filter(subreddit__name=self.kwargs['r_name']).order_by('-updated_at', '-votes')

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
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PostSerializer_detailed
        if self.request.method == 'POST':
            return PostSerializer    

    def get_queryset(self):
        return Post.objects.filter(profile__username=self.kwargs['username']).order_by('-updated_at')

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