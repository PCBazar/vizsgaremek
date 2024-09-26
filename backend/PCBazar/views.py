from django.shortcuts import render
from . import serializers
from rest_framework.decorators import api_view
from . import models
from django.http import JsonResponse
from django.contrib.auth import login, authenticate,logout
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.middleware.csrf import get_token
from rest_framework import status



def indexPage(request):
    return render(request, "index.html")

@api_view(["GET"])
def GetAll(request):
    products=models.Product.objects.all()
    transaction=models.Transaction.objects.all()
    review=models.Review.objects.all()
    product_serializer = serializers.ProductSerializer(products, many=True)
    transaction_serializer = serializers.TransactionSerializer(transaction, many=True)
    review_serializer = serializers.ReviewSerializer(review, many=True)
    serialized = {
            'products': product_serializer.data,
            'transaction': transaction_serializer.data,
            'review': review_serializer.data,
    }
    return JsonResponse(serialized,safe=True)

@api_view(["POST"])
def Login_page(request):
    csrf_token = get_token(request)
    if request.content_type == 'application/json':
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": f"Sikeres bejelentkezés!", "status": "success","csrfToken": csrf_token}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"message": "Sikertelen bejelentkezés!", "status": "error"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message": "Nem JSON formátum!"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])    
def Registration(request):
    if request.content_type == 'application/json':
        data = request.data
        _username=data.get('username')
        _password=data.get('password')
        _email=data.get('email')
        _first_name=data.get('first_name')
        _last_name=data.get('last_name')
        if User.objects.filter(username=_username).exists():
            return Response({"message": "A felhasználónév már foglalt!"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=_email).exists():
            return Response({"message": "Az email már foglalt!"}, status=status.HTTP_400_BAD_REQUEST)
        newUser=User(username=_username,email=_email,first_name=_first_name,last_name=_last_name)
        newUser.set_password(_password) 
        newUser.save()
        return Response({"message": "Sikeres regisztráció"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Nem JSON formátum!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def Logout_user(request):
        csrf_token = get_token(request)
        logout(request)
        return Response({"message": "Sikeres kijelentkezés!", "csrfToken": csrf_token}, status=status.HTTP_200_OK)

@api_view(['GET'])
def Login_status(request):
    if request.user.is_authenticated:
        return Response({"is_logged_in": True, "username": request.user.username}, status=status.HTTP_200_OK)
    else:
        return Response({"is_logged_in": False}, status=status.HTTP_200_OK)       


