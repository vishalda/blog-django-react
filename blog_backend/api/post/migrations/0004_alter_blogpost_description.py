# Generated by Django 3.2.4 on 2021-06-27 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_alter_blogcategory_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='description',
            field=models.TextField(),
        ),
    ]