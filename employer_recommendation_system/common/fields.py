from rest_framework import serializers

class CustomPKField(serializers.PrimaryKeyRelatedField):
    default_error_messages = {
        'does_not_exist' : 'Invalid {model_name} id "{pk_value}".',
    }    
