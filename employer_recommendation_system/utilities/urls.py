from django.urls import path

from .views import *

urlpatterns = [
    # API endpoint to retrieve cities based on selected states
   path('api/cities/by_state/', CityByStateAPIView.as_view(), name='city_by_state_api'),
   
        ]
