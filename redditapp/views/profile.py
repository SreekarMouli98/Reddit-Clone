from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListProfiles(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class DetailProfile(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    def put(self, request, *args, **kwargs):
        kwargs['partial'] = True 
        return self.update(request, *args, **kwargs)

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete()

