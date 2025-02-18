from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("student/",views.student_dashboard, name="student_dashboard" ),
    path("lecturer/",views.lecturer_dashboard, name= "lecturer_dashboard"),
    path("hod/",views.hod_dashboard, name= "hod_dashboard"),
    path("technician/", views.technician_dashboard, name="technician_dashboard"),
]
