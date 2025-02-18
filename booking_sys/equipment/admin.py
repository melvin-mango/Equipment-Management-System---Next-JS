from django.contrib import admin
from .models import Student,BorrowRequest,Equipment

admin.site.register(Equipment)
admin.site.register(BorrowRequest)
admin.site.register(Student)
# Register your models here.
