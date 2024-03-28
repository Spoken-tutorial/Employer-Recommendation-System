
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from hashlib import md5
from spoken.models import SpokenUser
from moodle.models import MdlUser
from django.contrib.auth.hashers import check_password
def reset_spk_password(email, password):
		try:
			user = SpokenUser.objects.get(email=email)
			user.password = make_password(password)
			# user.set_password(password)
			user.save()
		except User.DoesNotExist:
			return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
		except User.MultipleObjectsReturned:
			return Response({'error': 'Multiple users found'}, status=status.HTTP_400_BAD_REQUEST)
	
def reset_mdl_password(email, password):
    try:
        print(f"\033[93m Inside reset_mdl_password \033[0m")
        user = MdlUser.objects.get(email=email)
        salt = settings.MOODLE_PASSWORD_SALT
        encoded_password = password.encode('utf-8')
        encoded_salt = salt.encode('utf-8')
        hashed_password = md5(encoded_password + encoded_salt).hexdigest()
        user.password = hashed_password
        user.save()
    except Exception as e:
        print(f"\033[91m Exception : {e} \033[0m")
        pass
	
def modify_user_password(user, email, new_password, token_obj=None):
	# If user is student, change password in spk & mdl db
	if user.groups.filter(name='STUDENT').exists():
		reset_spk_password(email, new_password)
		reset_mdl_password(email, new_password)
	# If user has any role other than student, change password in jrs db
	else:
		user.set_password(new_password)
		user.save()
	if token_obj:
		token_obj.delete()
		
def check_user_password(user, current_password):
	if user.groups.filter(name='STUDENT').exists():
		try:
			spk_user = SpokenUser.objects.get(email=user.email)
			return check_password(current_password, spk_user.password)
		except:
			return check_password(current_password, user.password)
	else:
		return check_password(current_password, user.password)

