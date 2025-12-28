from django.http import JsonResponse
from django.shortcuts import render
from .models import *
# Create your views here.



def index(request):

    estudiantes = Estudiantes.objects.all()
    print(estudiantes)


    return render(request, 'vistas/index.html', {
        'estudiantes': estudiantes
    })

def estudiantes(request):
    estudiantes = Estudiantes.objects.all()

    print(estudiantes)
    
    return render(request, 'vistas/estudiantes.html', {
        'estudiantes': estudiantes
    })

def eliminar_estudiante(request, id):
    if request.method == 'POST':
        estudiante = Estudiantes.objects.get(id=id)
        estudiante.delete()

        return JsonResponse({'data': True})

def registrar_estudiante(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        edad = request.POST.get('edad')
        curso = request.POST.get('curso')

        print(curso)
        estudiante = Estudiantes.objects.create(
            nombre = nombre,
            apellido = apellido,
            edad = edad,    
            curso = curso,
        )
        estudiante.save()
        
    return render(request, 'vistas/estudiantes.html')
