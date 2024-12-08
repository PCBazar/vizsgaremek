from django.shortcuts import render
from . import serializers,models
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.contrib.auth import login, authenticate,logout
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status,generics,viewsets
from rest_framework.permissions import IsAuthenticated




def indexPage(request):
    return render(request, "index.html")

@api_view(["GET"])
def GetAll(request):
    category=models.Category.objects.all()
    products=models.Product.objects.all()
    transaction=models.Transaction.objects.all()
    review=models.Review.objects.all()
    category_serializer = serializers.CategorySerializer(category, many=True)
    product_serializer = serializers.ProductSerializer(products, many=True)
    transaction_serializer = serializers.TransactionSerializer(transaction, many=True)
    review_serializer = serializers.ReviewSerializer(review, many=True)
    serialized = {
            'products': product_serializer.data,
            'transaction': transaction_serializer.data,
            'review': review_serializer.data,
            'category': category_serializer.data,
    }
    return JsonResponse(serialized,safe=True)

@api_view(["POST"])
def Login_page(request):
    if request.content_type == 'application/json':
        data = request.data
        _username = data.get('username')
        _password = data.get('password')
        user = authenticate(username=_username, password=_password)
        if user is not None:
            login(request, user)
            return Response({'userId': user.id,"message": f"Sikeres bejelentkezés!",'username': _username, "status": "success",}, status=status.HTTP_202_ACCEPTED)
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
            return Response({"message": "A felhasználónév már foglalt!", "status": "error"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=_email).exists():
            return Response({"message": "Az email már foglalt!", "status": "error"}, status=status.HTTP_400_BAD_REQUEST)
        newUser=User(username=_username,email=_email,first_name=_first_name,last_name=_last_name)
        newUser.set_password(_password) 
        newUser.save()
        return Response({"message": "Sikeres regisztráció", "status": "succes"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Nem JSON formátum!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def Logout_user(request):
        logout(request)
        return Response({"message": "Sikeres kijelentkezés!"}, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def Add(request):
    # Kérési adatok beolvasása
    title = request.data.get('title')
    description = request.data.get('description')
    price = request.data.get('price')
    stock_quantity = request.data.get('stock_quantity')
    category_id = request.data.get('category')
    
    if not all([title, description, price, stock_quantity, category_id]):
        return Response({'message': 'Hiányzó mezők! Kérjük, töltsön ki minden mezőt.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        category = models.Category.objects.get(id=category_id)
    except models.Category.DoesNotExist:
        return Response({'message': 'A megadott kategória nem létezik.'}, status=status.HTTP_400_BAD_REQUEST)

    product = models.Product(
        title=title,
        description=description,
        price=price,
        stock_quantity=stock_quantity,
        category=category,
        seller=request.user 
    )
    if 'image' in request.FILES:
        product.image = request.FILES['image']
        
    product.save()
    serializer = serializers.ProductSerializer(product)
    
    return Response({'message': 'Sikeres hirdetésfeladás!', 'product': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def Cart(request):
    try:
        for item in request.data.get('items', []):
            product_id = item.get('product_id')
            quantity = item.get('quantity')
            payment_method = item.get('payment_method')

            if not all([product_id, quantity, payment_method]):
                return Response({'error': 'Hiányzó mezők! Kérjük, töltsön ki minden mezőt.'}, status=status.HTTP_400_BAD_REQUEST)

            product = models.Product.objects.get(id=product_id)

            if quantity > product.stock_quantity:
                return Response({'error': f'Nincs elegendő készlet a(z) {product.title} termékhez.'}, status=status.HTTP_400_BAD_REQUEST)

            transaction = models.Transaction.objects.create(
                buyer=request.user,  
                product=product,
                price=product.price * quantity, 
                payment_method=payment_method,
                stock_quantity=quantity
            )

            product.stock_quantity -= quantity
            product.save()
            
        return Response({'message': 'Tranzakciók sikeresen létrehozva.'}, status=status.HTTP_201_CREATED)

    except models.Product.DoesNotExist:
        return Response({'error': 'A megadott termék nem létezik.'}, status=status.HTTP_404_NOT_FOUND)


class AdvertisementUpdateView(generics.UpdateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Csak az adott felhasználó hirdetéseit engedjük módosítani
        return self.queryset.filter(owner=self.request.user)

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer



class UserAdvertisementsView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return models.Product.objects.filter(seller=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserTransactions(request):
    transactions = models.Transaction.objects.filter(buyer=request.user)
    serializer = serializers.TransactionSerializer(transactions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

