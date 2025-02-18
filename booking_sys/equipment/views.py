from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import BorrowRequest, Student, Equipment

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



