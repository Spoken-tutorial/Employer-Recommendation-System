from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from emp.models import Student

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print(f"\033[95m get token 1**** \033[0m")
        token = super().get_token(user)
        # Add custom claims
        token['user_id'] = user.id
        token['group'] = user.groups.first().name.lower() if user.groups.exists() else None
        try:
            print(f"\033[93m getting token \033[0m")
            spk_usr_id = Student.objects.get(user=user).spk_usr_id
            token['spk_usr_id'] = spk_usr_id
            print(f"\033[92m got spk_usr_id : {spk_usr_id} token \033[0m")
            print(f"\033[92m got the token \033[0m")
        except Exception as e:
            print(f"\033[91m error : {e} \033[0m")
            token['spk_usr_id'] = 0
            
        # print(f"\033[92m token ***** {token} \033[0m")
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']
        # read_only_fields = ['password']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False},
        }