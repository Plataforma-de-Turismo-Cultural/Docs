from rest_framework import serializers

'''
class ItineraryRequestSerializer(serializers.Serializer):
    destination = serializers.CharField(max_length=100)
    days = serializers.IntegerField(min_value=1)
    interests = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False
    )

'''
class ItineraryRequestSerializer(serializers.Serializer):
    preferences = serializers.ListField(child=serializers.CharField())
    num_people = serializers.IntegerField()
    adults = serializers.IntegerField()
    children = serializers.IntegerField()
    days = serializers.IntegerField()
    budget = serializers.FloatField()


class ItineraryResponseSerializer(serializers.Serializer):
    summary = serializers.CharField()
    details = serializers.ListField(child=serializers.DictField())
    estimated_score = serializers.FloatField()
