from django.db import models
from django.contrib.auth.models import User


class Equipment(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    serial_number = models.CharField(max_length=50, unique= True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"({self.name}{self.brand})"
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20,unique=True)

    def __str__(self):
        return self.user.username


class BorrowRequest(models.Model):
    student =  models.ForeignKey(Student , on_delete=models.CASCADE)
    Equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    lecturer_approved = models.BooleanField(default=  False)
    hod_approved = models.BooleanField(default= False)
    tech_approved =  models.BooleanField(default=False)
    requested_at = models.DateTimeField(auto_now_add=True)

    def fully_approved(Self):
        return Self.lecturer_approved and Self.hod_approved and Self.tech_approved