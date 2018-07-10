from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListCommentsOfPost(ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(parent_post__subreddit__name=self.kwargs['r_name'], parent_post__id=self.kwargs['p_id'])


class DetailCommentsOfPost(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        return get_object_or_404(queryset, parent_post__subreddit__name=self.kwargs['r_name'], parent_post__id=self.kwargs['p_id'], id=self.kwargs['c_id'])

class ListCommentsOfUser(ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(owner__username=self.kwargs['username'])

class DetailCommentsOfUser(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        return get_object_or_404(queryset, owner__username=self.kwargs['username'], id=self.kwargs['c_id'])

