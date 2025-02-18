from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Create initial groups for the application'

    def handle(self, *args, **kwargs):
        groups = ['Student', 'Lecturer', 'HOD', 'Technician']
        for group in groups:
            Group.objects.get_or_create(name=group)
        self.stdout.write(self.style.SUCCESS('Groups have been created successfully'))
