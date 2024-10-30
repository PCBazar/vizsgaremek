from django.urls import path,re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.indexPage, name="index"),
    path('api/GetAll/', views.GetAll,name="GetAll"),
    path('api/login/', views.Login_page,name="login_page"),
    path('api/registration/', views.Registration,name="Registration"),
    path('api/logout/', views.Logout_user,name="Logout_user"),
    path('api/status/', views.Login_status,name="Logout_user"),
    path('api/Add/', views.Add,name="Add"),
    path('api/cart/', views.Cart,name="Cart"),
    path('advertisements/<int:pk>/update/', views.AdvertisementUpdateView.as_view(), name='advertisement-update'),
    path('advertisements/<int:pk>/delete/', views.AdvertisementDeleteView.as_view(), name='advertisement-delete'),
    path('api/adverts/<int:pk>/', views.UserAdvertisementsUpdateView.as_view(), name='advert-update'),
    path('api/adverts/', views.UserAdvertisementsView.as_view(), name='user-advertisements'),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]