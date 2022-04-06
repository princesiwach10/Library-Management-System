from .models import User
from rest_framework import serializers
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework.serializers import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework.serializers import ValidationError, ModelSerializer


class UserAddSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, allow_null=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'is_superuser', 'password')

    def create(self, validated_data, **kwargs):
        user_group = Group.objects.get(name = 'User')
        instance = User.objects.create_user(**validated_data)
        instance.groups.set([user_group])
        instance.save()
        instance.refresh_from_db()
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            return user
        raise ValidationError("Email or password is incorrect.")


class GroupsSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(ModelSerializer):
    groups = GroupsSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'is_superuser', 'groups')

    def get_object(self):
        return self.request.user


