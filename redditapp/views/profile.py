from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *

class ListProfiles(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class DetailProfileUsingId(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'u_id'

class DetailProfileUsingUsername(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'owner__username'
    lookup_url_kwarg = 'username'