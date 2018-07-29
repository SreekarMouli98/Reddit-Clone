from rest_framework_jwt.settings import api_settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from redditapp.serializers import *

def jwt_response_payload_handler(token, user=None, request=None):
    """ Custom response payload handler.

    This function controlls the custom payload after login or token refresh. This data is returned through the web API.
    """
    return {
        'token': token,
        'profile_id': user.profile.id , 
        'profile_username': user.profile.username
    }

@api_view(['GET'])
def current_user(request):
    if not request.user.is_authenticated:
        return Response('User is not authenticated') 
    profile = Profile.objects.get(user=request.user) 
    serializer = CurrentProfileSerializer(profile)
    return Response(serializer.data)