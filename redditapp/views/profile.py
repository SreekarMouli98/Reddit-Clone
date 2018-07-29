from redditapp.models import *
from django.views.generic import *
from redditapp.serializers import *
from rest_framework.generics import *
from rest_framework.permissions import *

class ListProfiles(ListCreateAPIView):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProfileSerializer
        return ProfileSignupSerializer

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