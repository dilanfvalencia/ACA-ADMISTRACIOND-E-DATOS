from pyexpat.errors import messages
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from .models import *
# Create your views here.



def index(request):

    estudiantes = Estudiantes.objects.all()
    
    return render(request, 'vistas/index.html', {
        'estudiantes': estudiantes
    })

#funcion parta listar los estudiantes 
def estudiantes(request):
    estudiantes = Estudiantes.objects.all()
    cursos =Curso.objects.all()

    
    return render(request, 'vistas/estudiantes.html', {
        'estudiantes': estudiantes,
        'cursos':cursos,

    })


#Funcion para eliminar los estudiantes 

def eliminar_estudiante(request, id):
    if request.method == "POST":
        estudiante = get_object_or_404(Estudiantes, id=id)
        estudiante.delete()

        return JsonResponse({"success": True})

    return JsonResponse({"success": False}, status=400)


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
            curso = Curso.objects.get(id=curso),
        )
        estudiante.save()
        
    return redirect('estudiantes')


#funcion para listar las materias por curso.
def materias_por_curso(request, curso_id):
    #Obtiene el curso con el ID que trae del template
    curso = Curso.objects.get(id=curso_id)  

    #filtra en la tabla intermedia de cursoMateria y busca las materias que esten asociadas a ese ID del curso
    materias = CursoMateria.objects.filter(
        curso=curso
    ).values(
        "materia__id",
        "materia__nombre",
    )
    
    #Reenvia una lista al template en tiempo real de las materias que esten asignadas al curso seleccionado.
    return JsonResponse(list(materias), safe=False)

#Funcion para editar un usuario
def editar_usuario(request, id):
    estudiante = Estudiantes.objects.get(id = id)

    if request.method == "POST" :
        
        estudiante.nombre = request.POST.get('nombre')
        estudiante.apellido = request.POST.get('apellido')
        estudiante.edad = request.POST.get('edad')
        curso_e = request.POST.get('curso_e')
        
        estudiante.curso = Curso.objects.get(id = curso_e)

        estudiante.save()

        return JsonResponse(
        {
            "success": True,
            "id": estudiante.id,
            "nombre": estudiante.nombre,
            "edad": estudiante.edad,
            "curso": estudiante.curso.nombre_curso,
            "message": "Editado Correctamente!",
        })
            
   
