from rest_framework.views import APIView
from .models import City, State
from rest_framework.response import Response
from rest_framework import status

# Handle the request to retrieve cities based on selected states.
# If state_id equals 0, fetch all cities. Otherwise, filter cities by state_id.
class CityByStateAPIView(APIView):
    def get(self, request,):
        state_ids = request.data.get('state_ids',[])
        if 0 in state_ids:
            cities = City.objects.all().values('id', 'name')
        else:
            cities = City.objects.filter(state_id__in=state_ids).values('id', 'name')
        return Response(cities, status=status.HTTP_200_OK)
    
class StateData(APIView):
    def get(self, request):
        # print(f"\033[95m IN STATES \033[0m")
        data = State.objects.values('id', 'name')
        return Response(data, status=status.HTTP_200_OK)
    
class CityData(APIView):
    def get(self, request):
        # print(f"\033[95m IN STATES \033[0m")
        data = City.objects.values('id', 'name')
        return Response(data, status=status.HTTP_200_OK)
        
class CityByStateView(APIView):
    def get(self, request, state_id):

        # print(f"\033[93m cities by state \033[0m")
        # print(f"\033[92m state_id, type state_id : {state_id} { type(state_id)} \033[0m")
        data = City.objects.filter(state_id=state_id).values('id', 'name')
        return Response(data, status=status.HTTP_200_OK)