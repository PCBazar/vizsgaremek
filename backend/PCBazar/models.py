from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Category (models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=500,null=True,blank=True)
    def __str__(self) -> str:
        return self.name
    class Meta():
        verbose_name_plural = "Categories"
          
class Product(models.Model):
    title = models.CharField(max_length=250)
    price = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=3000, null=False, blank=False)
    image = models.ImageField(upload_to="static/images", default='static/images/default.png')
    def __str__(self) -> str:
        return self.title
    
class Transaction(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=0)
    transaction_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    stock_quantity = models.PositiveIntegerField(default=0)
    def __str__(self):
        return str(self.id) + " - " +  (self.buyer.username) + " - " + (self.product.title)
    
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    comment = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return (self.user.username) + " - " + (self.product.title)

    

    
    
