# Generated by Django 5.0.2 on 2024-02-13 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('user', 'User'), ('hr', 'HR')], default='user', max_length=100),
        ),
    ]