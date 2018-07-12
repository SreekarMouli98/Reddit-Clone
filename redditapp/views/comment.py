from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListCommentsOfPost(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentSerializer_detailed
        if self.request.method == 'POST':
            return CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(parent_post__subreddit__name=self.kwargs['r_name'], parent_post__id=self.kwargs['p_id'])


class DetailCommentsOfPost(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer_detailed

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        return get_object_or_404(queryset, parent_post__subreddit__name=self.kwargs['r_name'], parent_post__id=self.kwargs['p_id'], id=self.kwargs['c_id'])

class ListCommentsOfUser(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentSerializer_detailed
        if self.request.method == 'POST':
            return CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(profile__username=self.kwargs['username'])

class DetailCommentsOfUser(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer_detailed

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        return get_object_or_404(queryset, profile__username=self.kwargs['username'], id=self.kwargs['c_id'])

