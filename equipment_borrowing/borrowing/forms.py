from django import forms
from .models import Equipment, BorrowRequest
from django import forms

class CustomLoginForm(forms.Form):
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    role = forms.ChoiceField(choices=[
        ('Student', 'Student'),
        ('Lecturer', 'Lecturer'),
        ('HOD', 'HOD'),
        ('Technician', 'Technician')
    ], widget=forms.Select(attrs={'class': 'form-control'}))


from django import forms
from django.contrib.auth.models import User, Group

class SignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    role = forms.ChoiceField(choices=[
        ('Student', 'Student'),
        ('Lecturer', 'Lecturer'),
        ('HOD', 'HOD'),
        ('Technician', 'Technician')
    ], widget=forms.Select(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'password', 'role']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
        }


class BorrowRequestForm(forms.ModelForm):
    class Meta:
        model = BorrowRequest
        fields = ['equipment']
        widgets = {
            'equipment': forms.Select(attrs={'class': 'form-control'}),
        }

class EquipmentForm(forms.ModelForm):
    class Meta:
        model = Equipment
        fields = ['make', 'model', 'serial_number', 'available']
        widgets = {
            'make': forms.TextInput(attrs={'class': 'form-control'}),
            'model': forms.TextInput(attrs={'class': 'form-control'}),
            'serial_number': forms.TextInput(attrs={'class': 'form-control'}),
            'available': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
