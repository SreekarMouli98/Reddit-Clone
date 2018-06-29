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
    lookup_field = 'id'
    lookup_url_kwarg = 'u_id'