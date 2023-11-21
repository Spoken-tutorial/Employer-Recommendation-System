from distutils.log import error
import django


from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from spoken.models import SpokenUser
from django.contrib.auth.hashers import check_password
from .utility import *
from .helper import *
from django.contrib import messages
from django.db.models import Q
from django.contrib.auth import authenticate
from django.core.validators import validate_email

class SpokenStudentBackend(ModelBackend):    
    def authenticate(self, request, username=None, password=None): #Only check for email
        print(f"\033[96m SpokenStudentBackend \033[0m")
        email=username
        try:
            validate_email(email)
        except:
            #check if that username belongs to HR
            #if yes; authenticate using spk
            jrs_user = User.objects.filter(username=username) # Check for existing JRS user with no email
            if jrs_user:
                if check_password(password, jrs_user[0].password) :
                    return jrs_user[0]
            else:
                return None
            return None
        jrs_user=is_jrs_user(email)
        if jrs_user:#check password in jrs_db else in spk_db
            if jrs_user.password: #external user
                if check_password(password, jrs_user.password):
                    return jrs_user
                else:
                    return None
            else:#check spk password; spk, ilw
                sp_user = SpokenUser.objects.get(email=email)
                if check_password(password, sp_user.password): #For spk students & ilw
                    return jrs_user
                else:
                    messages.add_message(request,messages.INFO,"Please enter correct password. Password should be same as Spoken Tuttorial login.")
                    return None
        else:#new user; first time login
            sp_user = is_spk_user(email)
            if sp_user:
                if check_password(password, sp_user.password):
                    if is_hr_manager(sp_user):
                        jrs_user = create_jrs_user(sp_user)
                        create_hr_manager(jrs_user)
                        return jrs_user
                    else:
                        is_student_role = is_spk_student_role(sp_user)
                        is_student_record = is_spk_student_record(sp_user)
                        is_ilw = is_ILW(sp_user)
                        if is_student_role or is_student_record or is_ilw:
                            jrs_user = create_jrs_user(sp_user)
                            create_student(sp_user,jrs_user,is_student_role,is_student_record,is_ilw)
                            # if is_ilw:
                            #     create_ilw_student_role(jrs_user)
                            return jrs_user
            else:
                messages.add_message(request,messages.ERROR,"The email is not registered with Spoken Tutorial.")


        # mdl_user = is_mdl_user(email,password)
        # if mdl_user:
        #     jrs_user = create_mdl_user_in_jrs(mdl_user,password)
        #     return jrs_user
        return None                

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None