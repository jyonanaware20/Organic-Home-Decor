from django.db import models

# Create your models here.
from django.db import models

class Register(models.Model):
    name = models.CharField(max_length=20, unique=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15, blank=True, null=True)
    password = models.CharField(max_length=128)  
    is_default_password = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'register'

class Login(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    def __str__(self):
        return self.username

    class Meta:
        db_table = 'login'

from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=25)
    image = models.ImageField(upload_to='products')

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=20)

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.quantity})"

from django import forms

class AdminPasswordResetForm(forms.Form):
    email = forms.EmailField(label="User Email")

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
    ]
    user = models.ForeignKey(Register, on_delete=models.CASCADE)
    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')  # Pending, Approved, Shipped, etc.

    def __str__(self):
        return f"Order No. {self.id}  :Customer {self.user.username}   :   Status {self.status}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"