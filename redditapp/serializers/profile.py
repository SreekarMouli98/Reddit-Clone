from rest_framework import serializers
from redditapp.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    owner = UserSerializer(required=True)
    
    class Meta:
        model = Profile
        fields = ('id', 'dob', 'karma', 'owner')
        depth = 1

    def create(self, validated_data):
        user_data = validated_data.pop('owner')
        user = User.objects.create_user(**user_data)
        profile = Profile.objects.create(owner=user, **validated_data)
        return profile
    
    def update(self, instance, validated_data):
        pass
