from django.contrib import admin
from .models import Equipment, BorrowRequest

admin.site.register(Equipment)
admin.site.register(BorrowRequest)
