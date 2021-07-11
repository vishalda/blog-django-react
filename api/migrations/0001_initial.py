from django.db import migrations
from api.user.models import CustomUser
import os

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name = str(os.getenv('SUPERUSER_NAME')),
            email = str(os.getenv('SUPERUSER_EMAIL')),
            username =str(os.getenv('SUPERUSER_USERNAME')),
            is_staff=True,
            is_superuser=True,
            phone = "9876543210",)
        user.set_password(str(os.getenv('SUPERUSER_PASSWORD')))
        user.save()
    
    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]