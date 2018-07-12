from rest_framework import serializers
from redditapp.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    owner = UserSerializer(required=True)
    
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, username=validated_data.get('username'))
        profile = Profile.objects.create(owner=user, **validated_data)
        return profile
    
    def update(self, instance, validated_data):
        instance.dob = validated_data.get('dob', instance.dob)
        instance.karma = validated_data.get('karma', instance.karma)
        instance.username = validated_data.get('username', instance.username)
        user_data = validated_data.pop('user')
        instance.owner.first_name = user_data.get('first_name', instance.owner.first_name)
        instance.owner.last_name = user_data.get('last_name', instance.owner.last_name)
        instance.owner.email = user_data.get('email', instance.owner.email)
        instance.owner.password = user_data.get('password', instance.owner.password)
        instance.owner.save()
        instance.save()
        return instance
