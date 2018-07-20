from rest_framework import serializers
from redditapp.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, username=validated_data.get('username'))
        profile = Profile.objects.create(user=user, **validated_data)
        return profile
    
    def update(self, instance, validated_data):
        instance.dob = validated_data.get('dob', instance.dob)
        instance.karma = validated_data.get('karma', instance.karma)
        instance.username = validated_data.get('username', instance.username)
        user_data = validated_data.pop('user')
        instance.user.first_name = user_data.get('first_name', instance.user.first_name)
        instance.user.last_name = user_data.get('last_name', instance.user.last_name)
        instance.user.email = user_data.get('email', instance.user.email)
        new_password = user_data.get('password')
        if new_password:
            instance.user.set_password(new_password)
        instance.user.save()
        instance.save()
        return instance

    class Meta:
        model = Profile
        fields = '__all__'
        

