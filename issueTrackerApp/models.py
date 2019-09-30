from django.db import models


# Create your models here.

class User(models.Model):
    userName = models.CharField(max_length=30)   
    email = models.CharField(max_length=30)   

class Issue(models.Model):
    description = models.CharField(max_length=30)
    status      = models.BooleanField()  # open / closed
    createOn    = models.DateField(null=True)
    user        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    
# ###########