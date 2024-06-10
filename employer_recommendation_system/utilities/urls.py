from django.urls import path

from .views import *

urlpatterns = [
    # API endpoint to retrieve cities based on selected states
   path('api/cities/by_state/', CityByStateAPIView.as_view(), name='city_by_state_api'),
   
   path('api/states/',StateData.as_view(),name='job-data'), #API to prepopulate job form with initial options data
   path('api/states/<int:state_id>/cities/', CityByStateView.as_view(), name='city_by_state_api'),
   path('api/cities/', CityData.as_view(), name='city_by_state_api'),

   
   
        ]
