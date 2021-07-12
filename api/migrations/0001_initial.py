from django.db import migrations
from api.user.models import CustomUser
import os

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        #Change the following credentials
        user = CustomUser(name = 'abcd',
            email = 'abcd@gmail.com',
            username = 'ab_cd',
            is_staff=True,
            is_superuser=True,
            phone = "9876543210",)
        user.set_password('abcd')
        user.save()
    
    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
