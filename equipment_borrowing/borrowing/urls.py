from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='home'),  # Default view for the borrowing app
    path('login/', views.custom_login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout_view, name='logout'),
]
