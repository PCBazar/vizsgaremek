# Generated by Django 5.1.1 on 2024-10-31 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PCBazar', '0010_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(default='static/images/default.png', upload_to='static/images'),
        ),
    ]
