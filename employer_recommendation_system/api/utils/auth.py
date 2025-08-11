import string
import random

def generate_password(n=8):
    """generate alphanumeric password of length n"""
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars,k=n))
