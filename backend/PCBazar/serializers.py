from rest_framework import serializers
from .models import Product,Review,Transaction,Category
from django.contrib.auth.models import User

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'username']  

class ProductSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True)  

    class Meta:
        model = Product
        fields = "__all__"
        depth = 1 
        
class ReviewSerializer(serializers.ModelSerializer):
    user = SellerSerializer(read_only=True)  

    class Meta:
        model = Review
        fields = "__all__"
        depth = 1
        
class TransactionSerializer(serializers.ModelSerializer):
    buyer = SellerSerializer(read_only=True)  

    class Meta:
        model = Transaction
        fields = "__all__"
        depth = 1 
        
class CategorySerializer(serializers.ModelSerializer):  

    class Meta:
        model = Category
        fields = "__all__"