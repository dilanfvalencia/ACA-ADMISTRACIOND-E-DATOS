from django.http import JsonResponse
from django.shortcuts import redirect, render
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

#Funcion para eliminar los estudiantes 

def eliminar_estudiante(request, id):
    if request.method == 'POST':
        estudiante = Estudiantes.objects.get(id=id)
        estudiante.delete()
 
        return JsonResponse({'data': True})

#Funcion para registrar los estudiantes 
def registrar_estudiante(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        edad = request.POST.get('edad')
        curso = request.POST.get('curso')

       
        estudiante = Estudiantes.objects.create(
            nombre = nombre,
            apellido = apellido,
            edad = edad,    
            curso = curso,
        )
        estudiante.save()
        
    return redirect('estudiantes')


