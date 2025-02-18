from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):  # Ensure this is inside `equipment/models.py`
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('hod', 'Head of Department'),
        ('librarian', 'Librarian'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.user.username


class Equipment(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    serial_number = models.CharField(max_length=50, unique= True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"({self.name}{self.brand})"


class BorrowRequest(models.Model):
    student =  models.ForeignKey(Student , on_delete=models.CASCADE)
    Equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    lecturer_approved = models.BooleanField(default=  False)
    hod_approved = models.BooleanField(default= False)
    tech_approved =  models.BooleanField(default=False)
    requested_at = models.DateTimeField(auto_now_add=True)

    def fully_approved(Self):
        return Self.lecturer_approved and Self.hod_approved and Self.tech_approved