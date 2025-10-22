from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from datetime import datetime, timezone, timedelta

# Role checks
def is_admin(user):
    return bool(user and ('ADMIN' in user.groups.values_list('name', flat=True)))

def is_employer(user):
    return bool(user and ('EMPLOYER' in user.groups.values_list('name', flat=True)))

def is_student(user):
    return bool(user and ('STUDENT' in user.groups.values_list('name', flat=True)))

# Time Comparisons
def _compare(dt, delta=None):
    """Return (dt_utc, now_utc_with_delta)."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    if delta:
        now += delta
    return dt, now

def is_future(dt, delta=None):
    dt, now = _compare(dt, delta)
    return dt > now

def is_past(dt, delta=None):
    dt, now = _compare(dt, delta)
    return dt < now

