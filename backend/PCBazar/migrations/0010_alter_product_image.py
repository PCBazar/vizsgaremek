# Generated by Django 5.1.1 on 2024-10-30 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PCBazar', '0009_transaction_stock_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='static/images/default.png', null=True, upload_to='static/images'),
        ),
    ]
