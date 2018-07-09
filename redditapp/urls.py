from django.urls import path
from .views import *

app_name = 'reddit_app'

urlpatterns = [
    # API Views
    path('r/all/', ListAllPosts.as_view(), name='reddit-all'),
    path('r/popular/', ListPopularPosts.as_view(), name='reddit-popular'),
    # SUBREDDIT VIEWS
    path('r/', ListSubreddits.as_view(), name='reddits'),
    path('r/<str:r_name>/', DetailSubreddit.as_view(), name='reddits-detail'),
    path('r/<str:r_name>/posts/', ListPostsOfReddit.as_view(), name='reddit-posts'),
    path('r/<str:r_name>/posts/<int:p_id>/', DetailPostOfReddit.as_view(), name='reddit-posts-detail'),
    path('r/<str:r_name>/posts/<int:p_id>/comments/', ListCommentsOfPost.as_view(), name='reddit-post-comments'),
    path('r/<str:r_name>/posts/<int:p_id>/comments/<int:c_id>/', DetailCommentsOfPost.as_view(), name='reddit-post-comments-detail'),
    # USER VIEWS
    path('u/', ListProfiles.as_view(), name='profiles'),
    path('u/<int:u_id>/', DetailProfileUsingId.as_view(), name='profiles-detail-id'),
    path('u/<str:username>/', DetailProfileUsingUsername.as_view(), name='profiles-detail-username'),
    path('u/<int:u_id>/posts/', ListPostsOfUser.as_view(), name='profile-posts'), 
    path('u/<int:u_id>/posts/<int:p_id>/', DetailPostsOfUser.as_view(), name='profile-posts-detail'),
    path('u/<int:u_id>/comments/', ListCommentsOfUser.as_view(), name='profile-comments'),
    path('u/<int:u_id>/comments/<int:c_id>/', DetailCommentsOfUser.as_view(), name='profile-comments-detail'),
]
