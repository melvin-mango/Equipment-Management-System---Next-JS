from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import BorrowRequest, Student, Equipment
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import SignUpForm
from .models import CustomUser
from .forms import LoginForm
from django.contrib.auth import authenticate, login

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dashboard')  # Adjust the redirect destination as needed
    else:
        form = AuthenticationForm()

    return render(request, 'equipment/login.html', {'form': form})

def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('redirect_dashboard')
    else:
        form = SignUpForm()
    
    return render(request, 'equipment/signup.html', {'form': form})

@login_required
def redirect_dashboard(request):
    if request.user.role == 'student':
        return redirect('student_dashboard')
    elif request.user.role == 'lecturer':
        return redirect('lecturer_dashboard')
    elif request.user.role == 'hod':
        return redirect('hod_dashboard')
    elif request.user.role == 'technician':
        return redirect('technician_dashboard')
    return redirect('login')



@login_required
def student_dashboard(request):
    equipment_list = Equipment.objects.filter(available= True)
    if request.method == "POST":
        equipment_id = request.POST.get("equipment_id")
        equipment = request.objects.get(id=equipment_id)
        student = Student.objects.get(user= request.user)
        BorrowRequest.objects.create(student=student,equipment=equipment)
        return redirect("student_dashboard")
    
    return render(request, "equipment/student_dashboard.html", {"equipment_list": equipment_list} )


@login_required
def lecturer_dashboard(request):
    requests = Equipment.objects.filter(lecturer_approved = False)
    if (request.method == "POST"):
        req_id = request.POST.get("request_id")
        request_obg = BorrowRequest.objects.get(id=req_id)
        request_obg.lecturer_approved = True
        request_obg.save()
        return redirect("lecturer_dashboard")
    
    return render (request, 'equipment/lecturer_dashboard.html', {'requests':requests})


@login_required
def hod_dashboard(request):
    requests = Equipment.objects.filter(lecturer_approved = True , hod_approved = False)
    if (request.method == "POST"):
        req_id = requests.POST.get("request_id")
        request_obj = BorrowRequest.objects.get(id=req_id)
        request_obj.hod_approved = True
        request_obj.save()
        return redirect("hod_dashboard")
    
    return render(request , "equipment/hod_dashboard", {'requests':requests})



@login_required
def technician_dashboard(request):
    requests = Equipment.objects.filter(lecturer_approved =  True,hod_approved = True )
    if(request.method == "POST"):
        req_id = requests.POST.get("request_id")
        request_obj = BorrowRequest.objects.get(id=req_id)
        request_obj.tech_approved = True
        request_obj.save()
        return redirect(technician_dashboard)
    
    return render(request, "equipment/technician_dashboard.html",{"requests": request})



