from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    dob = models.DateField()
    karma = models.IntegerField(default=0)
    username = models.CharField(max_length=128)

    class Meta:
        unique_together = ("username", )

    def __str__(self):
        return "%s" % (self.username)

class Subreddit(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True, related_name='subreddits')
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    subscribers = models.ManyToManyField(Profile, blank=True, related_name='subscriptions')
    moderators = models.ManyToManyField(Profile, blank=True, related_name='moderates')

    def __str__(self):
        return '%s' % (self.name)

class Post(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    content = models.CharField(max_length=1000)
    votes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    subreddit = models.ForeignKey(Subreddit, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.title)

class Comment(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, null=True)
    content = models.CharField(max_length=500)
    votes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("Comment", null=True, blank=True, on_delete=models.DO_NOTHING)

    def __str__(self):
        return "%s's comment on \"%s\"" % (self.owner.username, self.parent_post)