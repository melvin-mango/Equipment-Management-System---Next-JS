from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from .forms import BorrowRequestForm, CustomLoginForm, SignupForm
from .models import BorrowRequest


@login_required
def dashboard(request):
    if request.user.groups.filter(name='Technician').exists():
        requests = BorrowRequest.objects.filter(lecturer_approved=True, hod_approved=True, given_away=False)
        role = 'Technician'
    elif request.user.groups.filter(name='Lecturer').exists():
        requests = BorrowRequest.objects.filter(lecturer_approved=False)
        role = 'Lecturer'
    elif request.user.groups.filter(name='HOD').exists():
        requests = BorrowRequest.objects.filter(hod_approved=False)
        role = 'HOD'
    else:
        requests = BorrowRequest.objects.filter(student=request.user)
        role = 'Student'

    return render(request, 'borrowing/dashboard.html', {'requests': requests, 'role': role})


@login_required
def create_borrow_request(request):
    if request.method == 'POST':
        form = BorrowRequestForm(request.POST)
        if form.is_valid():
            borrow_request = form.save(commit=False)
            borrow_request.student = request.user
            borrow_request.save()
            return redirect('dashboard')  # or another relevant page
    else:
        form = BorrowRequestForm()

    return render(request, 'borrowing/create_borrow_request.html', {'form': form})


# Custom login view
def custom_login(request):
    if request.method == 'POST':
        form = CustomLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to home or dashboard after successful login
            else:
                form.add_error(None, "Invalid username or password")  # Show error if credentials are wrong
    else:
        form = CustomLoginForm()

    return render(request, 'registration/login.html', {'form': form})


# Logout view
def logout_view(request):
    logout(request)
    return redirect('login')


# Signup view
def signup(request):
    # Redirect to home/dashboard if the user is already logged in
    if request.user.is_authenticated:
        return redirect('home')  # Change 'home' to your actual home or dashboard page name

    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()

            # Assign the user to the correct group based on the role selected
            role = form.cleaned_data['role']
            group = Group.objects.get(name=role)
            user.groups.add(group)

            # Log the user in after registration
            login(request, user)
            return redirect('home')  # Redirect to the home/dashboard after signup
        else:
            print(form.errors)  # Debugging: print form errors in the console
    else:
        form = SignupForm()

    return render(request, 'registration/signup.html', {'form': form})
