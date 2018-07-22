from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dob = models.DateField()
    karma = models.IntegerField(default=0)
    username = models.CharField(max_length=128)

    class Meta:
        unique_together = ("username", )

    def __str__(self):
        return "%s" % (self.username)

class Subreddit(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True, related_name='subreddits')
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    subscribers = models.ManyToManyField(Profile, blank=True, related_name='subscriptions')
    moderators = models.ManyToManyField(Profile, blank=True, related_name='moderates')
    rules=models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        unique_together = ("name", )

    def __str__(self):
        return '%s' % (self.name)

class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    subreddit = models.ForeignKey(Subreddit, on_delete=models.CASCADE)
    upvotes = models.ManyToManyField(Profile, blank=True, related_name='upvoted_posts')
    downvotes = models.ManyToManyField(Profile, blank=True, related_name='downvoted_posts')

    def __str__(self):
        return '%s' % (self.title)

class Comment(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, null=True)
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("Comment", null=True, blank=True, on_delete=models.DO_NOTHING)
    upvotes = models.ManyToManyField(Profile, blank=True, related_name='upvoted_comments')
    downvotes = models.ManyToManyField(Profile, blank=True, related_name='downvoted_comments')

    def __str__(self):
        return "%s's comment on \"%s\"" % (self.profile, self.parent_post)