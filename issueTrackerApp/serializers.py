from rest_framework import serializers    
from .models import Issue, User  
     
class UserSerializer(serializers.ModelSerializer):  
    class Meta:     
        model = User    
        fields = ['id', 'userName', 'email']

class IssueSerializer(serializers.ModelSerializer):  
    class Meta:     
        model = Issue   
        fields = ['id', 'description', 'status', 'createOn', 'user']


