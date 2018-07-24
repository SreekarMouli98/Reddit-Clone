from redditapp.models import *
from django.db.models import Count
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *
from rest_framework.permissions import *

class ListHomePosts(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer_detailed
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        return Post.objects.annotate(total_votes=Count('upvotes')-Count('downvotes')).filter(subreddit__subscribers__username=self.kwargs['username']).order_by('-updated_at', '-total_votes')

class ListAllPosts(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer_detailed
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        return Post.objects.annotate(total_votes=Count('upvotes')-Count('downvotes')).order_by('-updated_at', '-total_votes')

class ListPopularPosts(ListAPIView):
    serializer_class = PostSerializer_detailed
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        return Post.objects.annotate(total_votes=Count('upvotes')-Count('downvotes')).order_by('-total_votes', '-updated_at')

class ListPostsOfReddit(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PostSerializer_detailed
        if self.request.method == 'POST':
            return PostSerializer

    def get_queryset(self):
        return Post.objects.annotate(total_votes=Count('upvotes')-Count('downvotes')).order_by('-updated_at', '-total_votes').filter(subreddit__name=self.kwargs['r_name'])

class DetailPostOfReddit(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PostSerializer_detailed
        return PostSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'subreddit__name': self.kwargs['r_name'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)   

    def put(self, request, *args, **kwargs):
        kwargs['partial'] = True 
        return self.update(request, *args, **kwargs)     

class ListPostsOfUser(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

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
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'profile__username': self.kwargs['username'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)      