from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def send_forgot_pwd_mail(user, reset_link):
    forgot_password_html_content = render_to_string('forgot_password_mail.html', 
                                                    {'firstname': user.first_name, 'lastname':user.last_name, 
                                                     'email': user.email, 'link': reset_link})
    subject = "JRS Password Reset Link"
    from_email = settings.ADMINISTRATOR_EMAIL
    text_content = f"Please click the link to reset your password: {reset_link}"
    
    send_custom_email(subject, from_email, [user.email], text_content, forgot_password_html_content)


def send_custom_email(subject, from_email, to_emails, text_content, html_content):
    to = to_emails
    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)
