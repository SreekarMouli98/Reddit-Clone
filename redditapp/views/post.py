from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class ListPostsOfReddit(ListAPIView):
    serializer_class = PostSerializer
    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Post.objects.filter(subreddit__id=self.kwargs['r_id'])

class DetailPostOfReddit(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'subreddit__id': self.kwargs['r_id'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)        

class ListPostsOfUser(ListAPIView):
    serializer_class = PostSerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Post.objects.filter(owner__id=self.kwargs['u_id'])

class DetailPostsOfUser(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (IsAuthenticated,)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        conditions = {
            'owner__id': self.kwargs['u_id'],
            'id': self.kwargs['p_id']
        }
        return get_object_or_404(queryset, **conditions)      