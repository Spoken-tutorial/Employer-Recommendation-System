from rest_framework.views import APIView
from .models import City, State
from rest_framework.response import Response
from rest_framework import status

# Handle the request to retrieve cities based on selected states.
# If state_id equals 0, fetch all cities. Otherwise, filter cities by state_id.
class CityByStateAPIView(APIView):
    def post(self, request):
        state_ids = request.data.get('state_ids',[])
        if 0 in state_ids:
            cities = City.objects.all().values('id', 'name')
        else:
            cities = City.objects.filter(state_id__in=state_ids).values('id', 'name')
        return Response(cities, status=status.HTTP_200_OK)