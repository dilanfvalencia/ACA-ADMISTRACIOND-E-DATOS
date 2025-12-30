from django.db import models


# Create your models here.

class Materia (models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    

class Curso(models.Model):
    id=models.AutoField(primary_key=True)
    nombre_curso = models.CharField(max_length=30)
   
    
class Estudiantes (models.Model):
    id = models.AutoField(primary_key=True)
    nombre= models.CharField(max_length=30)
    apellido= models.CharField(max_length=30)
    edad = models.IntegerField()
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)


class CursoMateria(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
