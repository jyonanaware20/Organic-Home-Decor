"""
URL configuration for web1project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from web1app import views as v
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from web1app.views import admin_reset_password


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',v.home),
    path('product',v.view_product,name='product'),
    # path('product_page/<int:id>/',v.product_page),
    path('bill',v.bill,name='bill'),
    path('cart/',v.cart,name='cart'),
    path('register/', v.register_view,name='register'),
    path('login/', v.login_view,name='login'),
    path('logout/', v.logout_view,name='logout'),
    path('forget/', v.forget_password,name='forget'),
    path('admin-reset-password/', admin_reset_password, name='admin-reset-password'),
    path('forcepassword/', v.forcepassword, name='forcepassword'),
    path('place_order_js/', v.place_order_js, name='place_order_js'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
