from django.db import models


# Create your models here.
class Estudiantes (models.Model):
    id = models.AutoField(primary_key=True)
    nombre= models.CharField(max_length=30)
    apellido= models.CharField(max_length=30)
    edad = models.IntegerField()
    curso = models.CharField(max_length=30)

