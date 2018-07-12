from django.urls import path
from .views import *

app_name = 'reddit_app'

urlpatterns = [
    # SUBREDDIT VIEWS
    path('r/', ListSubreddits.as_view(), name='reddits'),
    path('r/all/', ListAllPosts.as_view(), name='reddit-all'),
    path('r/popular/', ListPopularPosts.as_view(), name='reddit-popular'),
    path('r/<str:r_name>/', DetailSubreddit.as_view(), name='reddits-detail'),
    path('r/<str:r_name>/posts/', ListPostsOfReddit.as_view(), name='reddit-posts'),
    path('r/<str:r_name>/posts/<int:p_id>/', DetailPostOfReddit.as_view(), name='reddit-posts-detail'),
    path('r/<str:r_name>/posts/<int:p_id>/comments/', ListCommentsOfPost.as_view(), name='reddit-post-comments'),
    path('r/<str:r_name>/posts/<int:p_id>/comments/<int:c_id>/', DetailCommentsOfPost.as_view(), name='reddit-post-comments-detail'),
    # USER VIEWS
    path('u/', ListProfiles.as_view(), name='profiles'),
    path('u/<str:username>/', DetailProfile.as_view(), name='profiles-detail'),
    path('u/<str:username>/posts/', ListPostsOfUser.as_view(), name='profile-posts'), 
    path('u/<str:username>/posts/<int:p_id>/', DetailPostsOfUser.as_view(), name='profile-posts-detail'),
    path('u/<str:username>/comments/', ListCommentsOfUser.as_view(), name='profile-comments'),
    path('u/<str:username>/comments/<int:c_id>/', DetailCommentsOfUser.as_view(), name='profile-comments-detail'),
]
