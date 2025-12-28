from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('estudiantes/', views.estudiantes, name='estudiantes'),
    path('eliminar-estudiante/<int:id>/', views.eliminar_estudiante, name='eliminar_estudiante'),
    path('registrar-estudiante/', views.registrar_estudiante,name= 'registrar_estudiante')
]
