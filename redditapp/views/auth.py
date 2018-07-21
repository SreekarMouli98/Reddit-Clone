from rest_framework_jwt.settings import api_settings

def jwt_response_payload_handler(token, user=None, request=None):
    """ Custom response payload handler.

    This function controlls the custom payload after login or token refresh. This data is returned through the web API.
    """
    return {
        'token': token,
        'profile_id': user.profile.id , 
        'profile_username': user.profile.username
    } 

