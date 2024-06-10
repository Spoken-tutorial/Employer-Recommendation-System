from rest_framework import serializers
from .models import Location
from utilities.models import City, State

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['city_id', 'state_id', 'address', 'pincode']

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'city' in validated_data.keys():
            validated_data['city'] = City.objects.get(id=validated_data['city'])
        if 'state' in validated_data.keys():
            validated_data['state'] = State.objects.get(id=validated_data['state'])
        return super().update(instance, validated_data)
    
    # def validate(self, attrs):
    #     return super().validate(attrs)

    def to_internal_value(self, data):
        return data