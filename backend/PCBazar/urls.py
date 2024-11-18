from django.urls import path,re_path,include
from . import views
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'advertisements', views.AdvertisementViewSet)

urlpatterns = [
    path('', views.indexPage, name="index"),
    path('api/GetAll/', views.GetAll,name="GetAll"),
    path('api/login/', views.Login_page,name="login_page"),
    path('api/registration/', views.Registration,name="Registration"),
    path('api/logout/', views.Logout_user,name="Logout_user"),
    path('api/Add/', views.Add,name="Add"),
    path('api/cart/', views.Cart,name="Cart"),
    path('advertisements/<int:pk>/update/', views.AdvertisementUpdateView.as_view(), name='advertisement-update'),
    path('api/addList/', views.UserAdvertisementsView.as_view(), name='user-advertisements'),
    path('api/', include(router.urls)),
    path('api/user/transactions/', views.UserTransactions, name="user_transactions"),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]