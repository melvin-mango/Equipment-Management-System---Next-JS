from django.db import models
from django.contrib.auth.models import User

class Equipment(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.make} {self.model} - {self.serial_number}"

class BorrowRequest(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrow_requests')
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    lecturer_approved = models.BooleanField(default=False)
    hod_approved = models.BooleanField(default=False)
    technician = models.ForeignKey(User, on_delete=models.CASCADE, related_name='technician', null=True, blank=True)
    given_away = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.student.username} for {self.equipment.make} {self.equipment.model}"
