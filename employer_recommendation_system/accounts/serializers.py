from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
class RegistrationFormSerializer(serializers.Serializer):
    company_name = serializers.CharField(max_length=255)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone']

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'profile']

    def get_profile(self, obj):
        try:
            p = Profile.objects.get(user=obj.id)
        except:
            p = None
        return ProfileSerializer(p).data


# class UserSerializerWithToken(serializers.ModelSerializer):
#     token = serializers.SerializerMethodField()
#     password = serializers.CharField(write_only=True)
#     profile = serializers.SerializerMethodField()
#     class Meta:
#         model = User
#         fields = ['id','first_name', 'last_name', 'username', 'email', 'password', 'token', 'profile']

#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)

#     def get_profile(self, obj):
#         try:
#             p = Profile.objects.get(user=obj.id)
#         except:
#             p = None
#         return ProfileSerializer(p).data

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

     @classmethod
     def get_token(cls, user):
         print(f"\033[92m CustomTokenObtainPairSerializer  \033[0m")
         token = super().get_token(user)
         token['username'] = user.username
         return token