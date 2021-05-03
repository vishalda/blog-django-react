from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name = "Vishal",
            email = "vda.vishal@gmail.com",
            username = "VDA_001",
            is_staff=True,
            is_superuser=True,
            phone = "9876543210",)
        user.set_password("qwert")
        user.save()
    
    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]