from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Product,Order,OrderItem

class OrderItemInline(admin.TabularInline):  
    model = OrderItem
    extra = 0 
    readonly_fields = ('product', 'quantity')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status')
    inlines = [OrderItemInline] 


admin.site.register(Product)


