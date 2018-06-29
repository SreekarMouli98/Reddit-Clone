from django.contrib import admin
from redditapp.models import *

admin.site.register(Profile)
admin.site.register(Subreddit)
admin.site.register(Post)
admin.site.register(Comment)