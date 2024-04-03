from django.shortcuts import render,redirect
from django.contrib.auth.views import LoginView
from django.views import generic
from django.urls import reverse_lazy, reverse
from django.contrib.auth.decorators import login_required
from spoken.models import SpokenGroup
from moodle.models import MdlUser
from .forms import ChangePasswordForm, RegisterForm, PasswordResetForm
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from django.contrib.auth.models import Group,User
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from emp.models import *
from django.conf import settings
UserModel = get_user_model()
from emp.models import Student as RecStudent
from spoken.models import SpokenStudent as SpkStudent
import random
import string
from spoken.backends import *
from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponseRedirect
from django.conf import settings
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from spoken.models import SpokenState, FossMdlCourses
from .serializers import RegistrationFormSerializer
from django.db import IntegrityError
from rest_framework.decorators import api_view
from accounts.models import Profile as JRSProfile
from emp.helper import validate_otp
from accounts.serializers import CompanyRegistrationSerializer, CompanyManagerUserProfileSerializer
from utilities.utils import send_forgot_pwd_mail

SITE_URL = getattr(settings, "SITE_URL", "https://jrs.spoken-tutorial.org/")
PASSWORD_MAIL_SENDER = getattr(settings, "NO_REPLY_SPOKEN_MAIL", "no-reply@spoken-tutorial.org")

class LoginViewCustom(LoginView):
	template_name = 'accounts/login.html'					

	def get_success_url(self):	
		role_url = {
		settings.ROLES['MANAGER'][1]:'/manager',
		settings.ROLES['STUDENT'][1]:'/student',
		settings.ROLES['EMPLOYER'][1]:'/employer',
		"STUDENT_ILW" : '/student',
		}
		url = role_url[self.request.user.groups.all()[0].name]
		r = self.request.POST.get('next')
		r2 = self.request.get_full_path()
		r1 = self.redirect_field_name
		if 'change-password' in r2:
			return reverse('change_password')
		return url

class RegisterView(generic.CreateView):
	form_class = RegisterForm
	template_name = 'accounts/register.html'
	
	def get_success_url(self):
		messages.add_message(self.request, messages.INFO, 'Successfully Registered !')
		return reverse('login')

	def form_valid(self, form):
		response = super().form_valid(form)
		user = UserModel.objects.get(Q(username__iexact=form.data['username']) | Q(email__iexact=form.data['email']))
		group_type = form.data['group']
		if group_type=='students':
			pass
		g = Group.objects.get(name=group_type)
		user.groups.add(g)
		user.save()
		return response
def update_msg(request):
	django_messages = []
	for message in messages.get_messages(request):
			django_messages.append({'message':message.message,'tag':message.tags})	
			return django_messages

def validate_student(request):
	email = request.GET.get('email', None)
	data = {}
	#check if user is jrs student
	is_jrs_student = Student.objects.filter(user__email__iexact=email).exists()
	is_spk_student = SpokenStudent.objects.filter(user__email__iexact=email).exists()
	if is_jrs_student or is_spk_student:
		data['is_student'] = True
		messages.success(request,"Email Id is already registered. Please click below sign in button & login using your Spoken Tutorial credentials.")
		data['messages'] = update_msg(request)
		return JsonResponse(data)
	data['is_student'] = False
	return JsonResponse(data)
	
def register_student(request):
	if request.method == 'POST':
		email = request.POST['email']
		password = request.POST['password']
		first_name = request.POST['first_name']
		last_name = request.POST['last_name']
		try:
			user = User.objects.create_user(username=email,email=email,password=password,first_name=first_name,last_name=last_name)
			student_group = Group.objects.get(id=settings.ROLES['STUDENT'][0])
			user.groups.add(student_group)
			user.save()
			student_obj=RecStudent.objects.create(user=user)
			messages.add_message(request, messages.INFO, f'User with email {email} registered successfully!')
		except Exception as e:
			print(e)
	return redirect(reverse('login'))

def create_profile(user, phone):
    confirmation_code = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for x in range(7))
    profile = Profile(user=user, confirmation_code=confirmation_code, phone=phone,created=datetime.now())
    profile.save()
    return profile

def reset_password(request):
	context = {}
	form = PasswordResetForm()
	context['form'] = form
	if request.method == "POST":
		form = PasswordResetForm(request.POST)
		context['form'] = form
		if form.is_valid():
			email=request.POST['email']
			password = ''.join( random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
			
			# check if the user exists in SpokenUser
			spoken_user = SpokenUser.objects.filter(Q(email=email) | Q(username=email)).first()
			# check if the user exists in MdlUser
			mdl_user = MdlUser.objects.filter(email=email).first()
			if mdl_user:
				mdl_pwd = encript_mdl_password(password)
				mdl_user.password = mdl_pwd
				mdl_user.save()
				if not spoken_user:
					spoken_user = SpokenUser.objects.create(email=email,username=email,password=password,
                    is_active=True,is_superuser=0,is_staff=0,date_joined=datetime.now(),first_name=mdl_user.firstname,last_name=mdl_user.lastname)
					group = SpokenGroup.objects.get(name='Student')
					try:
						SpokenUserGroup.objects.create(user=spoken_user,group=group)
					except:
						print("User has Student role")
			else:
				print("Student is not mdluser")

			spoken_user.password = make_password(password)
			spoken_user.save()
			
			
			if not spoken_user.profile_set.first():
				profile = create_profile(spoken_user,None)
			changePassUrl = SITE_URL+"accounts/change-password"
			
			subject  = "Spoken Tutorial password reset"
			to = [spoken_user.email]
			message = '''Hi {0},

Your account password at 'Spoken Tutorials' has been reset
and you have been issued with a new temporary password.

Your current login information is now:
   username: {1}
   password: {2}

With respect to change your password kindly follow the steps written below :

Step 1. Visit below link to change the password. Provide temporary password given above in the place of Old Password field.
    {3}

Step 2.Use this changed password for spoken Forum Login, Moodle Login & Job Recommendation System also.

In most mail programs, this should appear as a blue link which you can just click on.  If that doesn't work, then cut and 
paste the address into the address line at the top of your web browser window.

Best Wishes,
Admin
Spoken Tutorials
IIT Bombay.
'''.format(spoken_user.username, spoken_user.email, password,changePassUrl)

			print(f"username ***************** {spoken_user.email}\npassword ******************** {password}\nchangePassUrl ************** {changePassUrl}")
			email = EmailMultiAlternatives(
                subject, message, PASSWORD_MAIL_SENDER,
                to = to, bcc = [], cc = [],
                headers={'Reply-To': PASSWORD_MAIL_SENDER, "Content-type":"text/html;charset=iso-8859-1"}
            )
			try:
				result = email.send(fail_silently=False)
				messages.success(request, "New password has been sent to your email "+spoken_user.email)
				return HttpResponseRedirect(SITE_URL+'accounts/change-password/')

			except Exception as e:
				print(e)
		else:
			print(form.errors)
	return render(request, 'accounts/password_reset.html',context)

def changeMdlUserPass(email, password_string):
    # updated mdl pass when auth user pass change
    try:
        user = MdlUser.objects.filter(email=email).first()
        password_encript = encript_mdl_password(password_string)
        user.password = password_encript
        user.save()
        return True
    except Exception:
        return False

# @login_required
def change_password(request):
	context = {}
	form = ChangePasswordForm()
	if request.user.is_anonymous:
		# return HttpResponseRedirect(reverse('change_password'))
		return HttpResponseRedirect(SITE_URL+'login/?next=/accounts/change-password')

	if request.method == 'POST':
		form = ChangePasswordForm(request.POST)
		if form.is_valid():
			profile = Profile.objects.get(user_id = form.cleaned_data['userid'], confirmation_code = form.cleaned_data['code'])
			user = profile.user
			user.password = make_password(form.cleaned_data['new_password'])
			# user.set_password(form.cleaned_data['new_password'])
			user.save()
			changeMdlUserPass(user.email, form.cleaned_data['new_password'])
			messages.success(request, "Your account password has been updated successfully!")
			# return HttpResponseRedirect("/login/")
			return HttpResponseRedirect(reverse('login'))
	
	context['form'] = form
	# get code from profile
	# s = request.user.student
	# spk_user_id = s.spk_usr_id
	try:
		spk_user = SpokenUser.objects.filter(email=request.user.email)[0]
		spk_user_id = spk_user.id
	except:
		print("Not a spoken user") #fossee user
	context['userid'] = spk_user.id
	profile = Profile.objects.filter(user_id=spk_user_id).first()
	if profile:
		context['code'] = profile.confirmation_code

	return render(request, 'accounts/change_password.html', context)

class RegistrationDataView(APIView):
	def get(self, request):
		print("inside get")
		
		data = {}
		data['roles'] = settings.ROLES
		data['groups'] = [{'label': group['name'], 'value': group['id']} for group in Group.objects.values('id','name')]
		data['domains'] = [{'label': group['name'], 'value': group['id']} for group in Domain.objects.values('id','name').order_by('name')]
		data['states'] = [{'label': group['name'], 'value': group['id']} for group in SpokenState.objects.values('id','name').order_by('name')]
		data['cities'] = [{'label': group['name'], 'value': group['id']} for group in SpokenCity.objects.values('id','name').order_by('name')]
		data['jobtypes'] = [{'label': group['jobtype'], 'value': group['id']} for group in JobType.objects.values('id','jobtype').order_by('jobtype')]
		data['fosses'] = [{'label': group['foss__foss'], 'value': group['foss__id']} for group in FossMdlCourses.objects.values('foss__id','foss__foss').order_by('foss__foss')]
		data['skills'] = [{'label': group['name'], 'value': group['id']} for group in Skill.objects.values('id','name').order_by('name')]
		data['degrees'] =[{'label': group['name'], 'value': group['id']} for group in Degree.objects.values('id','name').order_by('name')]
		data['disciplines'] = [{'label': group['name'], 'value': group['id']} for group in Discipline.objects.values('id','name').order_by('name')]
		
		return Response(data, status=status.HTTP_200_OK)
	
	def post(self, request):
		print(f"\033[92m request data: {request.data} \033[0m")
		serializer = CompanyRegistrationSerializer(data=request.data)
		if serializer.is_valid():
			print(f"\033[95m serizlier is valid \033[0m")
			a=serializer.save()
			
			print(f"\033[92m THE INSTANCE IS SAVED \033[0m")
			print(f"\033[94m THE INSTACE A = { type(a)} \033[0m")
			print(f"\033[1m INSANCE DATA serializer.data : {serializer.data} \033[0m")
			return Response("SUCCESS", status=status.HTTP_201_CREATED)
		else:
			print(f"\033[93m serializer error : {serializer.errors} \033[0m")
		# return Response({"name": "name error"}, status=status.HTTP_400_BAD_REQUEST)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
		
	# def post(self, request):
	# 	print(request.data)
	# 	company = request.data.get('company_name')
	# 	fname = request.data.get('user_fname')
	# 	lname = request.data.get('user_lname')
	# 	phone = request.data.get('user_phone')
	# 	email = request.data.get('user_email')
	# 	pwd = request.data.get('user_password')
	# 	cnf_pwd = request.data.get('user_confirm_password')
	# 	website = request.data.get('company_website')
	# 	is_agency = request.data.get('is_agency') == 'true'
	# 	job_title = request.data.get('job_title')
	# 	domain = request.data.get('job_domain',None)
	# 	job_state = request.data.get('job_state',None)
	# 	job_city = request.data.get('job_city',None)
	# 	job_type = request.data.get('job_type',None)
	# 	job_skills = request.data.get('job_skills',None)
	# 	mandatory_skills = request.data.get('job_mandatory_skills',None)
	# 	option_skills = request.data.get('job_optional_skills',None)
	# 	new_skills = [x for x in job_skills if type(x) == str]
	# 	existing_skills = [x for x in job_skills if type(x) == int]
	# 	salary_min = request.data.get('job_min_salary',None)
	# 	salary_max = request.data.get('job_max_salary',None)
	# 	years = request.data.get('student_years',None)
	# 	job_description = request.data.get('job_description','Not available')
	# 	job_responsibilities = request.data.get('job_responsibilities','Not available')
	# 	job_additional_skills = request.data.get('job_additional_skills','Not available')
	# 	vacancies = request.data.get('vacancies',None)
	# 	otp = int(request.data.get('otp',None))
		
	# 	#validate otp
	# 	if validate_otp(email, otp):
	# 		print(f"\033[92m OTP IS VALID : {email} - {otp} \033[0m")
	# 		for skill in new_skills:
	# 			s = Skill.objects.create(name=skill)
	# 			existing_skills.append(s.id)
	# 		print(f"\033[1m new_skills : {new_skills} \033[0m")
			
	# 		if pwd != cnf_pwd:
	# 			return Response("Password and Confirm Password does not match.", status=status.HTTP_400_BAD_REQUEST)
	# 		# email='test@gmail.com'
	# 		serializer = RegistrationFormSerializer(data=request.data)
	# 		error_msg = ''
	# 		error = False
	# 		if serializer.is_valid():
	# 			print("inside valid")
				
	# 			existing_company = Company.objects.filter(name=company).exists()
	# 			existing_user = User.objects.filter(email=email).exists()
	# 			if existing_company:
	# 				error_msg = "Company already registered with JRS. "
	# 				error = True
	# 			if existing_user:
	# 				error_msg = error_msg + "User already registered with JRS."
	# 				error = True
	# 			if error:
	# 				return Response(error_msg, status=status.HTTP_400_BAD_REQUEST)
	# 			else:
	# 				try:
	# 					print(f"\033[92m is_agency : {is_agency} {type(is_agency)} \033[0m")
	# 					company = Company.objects.create(name=company, website=website, is_agency=is_agency)
	# 					user = User.objects.create_user(username=email,email=email,password=pwd,first_name=fname,last_name=lname)
	# 					profile = JRSProfile.objects.create(user=user, phone=phone)
	# 					CompanyManagers.objects.create(company=company, user=user, group=Group.objects.get(name='COMPANY_MANAGER'))
	# 					if job_title:
	# 						job = Job.objects.create(company=company, title=job_title, domain_id=domain, state_job=job_state, 
	# 							city_job=job_city, job_type_id=job_type, salary_range_min=salary_min, salary_range_max=salary_max,
	# 							job_description=job_description, job_responsibilities=job_responsibilities, job_additional_skills=job_additional_skills,
	# 							num_vacancies=vacancies)
							
	# 						job.skills.set(existing_skills)
	# 						if mandatory_skills:
	# 							obj = [JobFoss(job=job, foss_id=x, type='Mandatory') for x in mandatory_skills]
	# 							JobFoss.objects.bulk_create(obj)
	# 						if option_skills:
	# 							obj = [JobFoss(job=job, foss_id=x, type='Optional') for x in option_skills]
	# 							JobFoss.objects.bulk_create(obj)
	# 					if years:
	# 						obj = [JobGraduatingYear(job=job, year=x, type='Mandatory') for x in years]
	# 						JobGraduatingYear.objects.bulk_create(obj)
	# 				except IntegrityError as e:
	# 					err = str(e)
	# 					print(e)
	# 					return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
	# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
	# 		else:
	# 			print("inside invalid")
	# 			print(serializer.errors)
	# 			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# 	else:
	# 		print(f"\033[91m OTP is invalid : {email} - {otp} \033[0m")
	# 		return Response("Invalid OTP" , status=status.HTTP_400_BAD_REQUEST)

			

@api_view(['GET'])
def validate_unique_data(request):
	company = request.GET.get('company_name', None)
	email = request.GET.get('email', None)
	if company:
		print(f"\033[97m Company exists \033[0m")
		if Company.objects.filter(name=company).exists():
			return Response(f"Company '{company}' already registered with JRS!", status=status.HTTP_400_BAD_REQUEST)
	if email:
		
		print(f"\033[91m Email exists \033[0m")
		if User.objects.filter(email=email).exists():
			return Response(f"Email {email} already registered with JRS!", status=status.HTTP_400_BAD_REQUEST)
	print(request.GET)
	print(request.data)
	
	
	
	return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
	print(request.data)
	email = request.data.get('email', None)
	password = request.data.get('password', None)
	user = authenticate(username=email, password=password)
	if user is not None:
		login(request, user)
		return Response(status=status.HTTP_200_OK)
	else:
		return Response("Invalid credentials", status=status.HTTP_400_BAD_REQUEST)
	


#----------------------------------- View V2 -----------------------------------#
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlencode
from django.contrib.auth import password_validation
from accounts.models import PasswordResetToken
from django.utils import timezone
from smtplib import SMTPException
from hashlib import md5
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .utils import modify_user_password, check_user_password

class CustomTokenObtainPairView(TokenObtainPairView):
	serializer_class = CustomTokenObtainPairSerializer


class LogoutView(APIView):
	# permission_classes = (IsAuthenticated,) # ToDo
	def post(self, request):
		print(request.data)
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
class PasswordResetView(APIView):
	def post(self, request, *args, **kwargs):
		# Handling password reset request
		if 'email' in request.data:
			print(f"\033[93m EMAIL \033[0m")
			return self.password_reset_request(request)
		elif 'token' in request.query_params and 'uid' in request.query_params:
			print(f"\033[93m TOKEN \033[0m")
			return self.password_reset_confirm(request)
		else:
			return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
		
	def send_password_reset_email(self, user):
		token = PasswordResetTokenGenerator().make_token(user)
		uid = urlsafe_base64_encode(force_bytes(user.pk))
		domain = get_current_site(self.request).domain
		link = reverse('password-reset-confirm')
		query_params = {'uid': uid, 'token': token}
		query_string = urlencode(query_params)
		reset_url = f"http://{domain}/{link}?{query_string}"
		print(f"\033[92m reset_url : {reset_url} \033[0m")
		try:
			send_mail(
				'Password Reset Request',
				f'Please click the following link to reset your password: {reset_url}',
				'from@example.com',
				[user.email],
				fail_silently=False)
		except Exception as e:
			pass
	
	def password_reset_request(self, request):
		try:
			email = request.data.get('email')
			user = User.objects.get(email=email)
			self.send_password_reset_email( user)
			return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({"error": f'{e}'}, status=status.HTTP_400_BAD_REQUEST)

	def password_reset_confirm(self, request):
		token = request.query_params.get('token')
		uid = request.query_params.get('uid')
		new_password = request.data.get('new_password')
		try:
			uid = urlsafe_base64_decode(uid).decode()
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			user = None

		if user is not None and PasswordResetTokenGenerator().check_token(user, token):
			user.set_password(new_password)
			user.save()
			return Response({"message": "Password reset success."}, status=status.HTTP_200_OK)
		else:
			return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
		
class ChangePasswordView(APIView):
	permission_classes = [IsAuthenticated,]

	def post(self, request, *args, **kwargs):
		user = request.user
		old_password = request.data.get('old_password')
		new_password = request.data.get('new_password')
		#check old password
		if not user.check_password(old_password):
			return Response({"error": "Old password is not correct"}, status=status.HTTP_400_BAD_REQUEST)
		# Validate and set new password
		try:
			password_validation.validate_password(new_password, user)
			user.set_password(new_password)
			user.save()
			return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({"error": f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
			
class ForgotPasswordView(APIView):
	def post(self, request, *args, **kwargs):
		email = request.data.get('email')
		try:
			user = User.objects.get(email=email)
			token = PasswordResetTokenGenerator().make_token(user)
			PasswordResetToken.objects.create(user=user, token=token, expires_at = timezone.now()+timezone.timedelta(hours=24))
			reset_link = f"{settings.REACT_APP_BASE_URL}/reset-password/{token}/"
			send_forgot_pwd_mail(user, reset_link)
			
			return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
		except User.DoesNotExist :
			return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
		except SMTPException as e:
			return Response({'error': 'User not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResetPasswordView(APIView):
	
	def post(self, request, token):
		token_obj = PasswordResetToken.objects.filter(token=token).first()
		if not token_obj or token_obj.is_expired:
			return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
		user = token_obj.user
		email = user.email
		new_password = request.data.get('new_password')
		modify_user_password(user, email, new_password, token_obj)
		return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)

class ChangePasswordAPIView(APIView):
	def post(self, request):
		user = request.user
		current_password = request.data.get('current_password')
		new_password = request.data.get('new_password')
		if check_user_password(user, current_password):
			modify_user_password(user, user.email, new_password)
			return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)			
		else:
			return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
		
class ProfileUpdateView(APIView):
	permission_classes = [IsAuthenticated]
	
	def patch(self, request):
		try:
			instance = CompanyManagers.objects.get(user_id=request.user)
		except CompanyManagers.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		serializer = CompanyManagerUserProfileSerializer(data=request.data, partial=True, instance=instance)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_200_OK)