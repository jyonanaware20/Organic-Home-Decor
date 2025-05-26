from django.shortcuts import render,redirect
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.forms import UserCreationForm
from .forms import registerform, LoginForm,ForcePasswordChangeForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Register
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
import random



# Create your views here.
def home(request):
    is_logged_in = request.session.get('user_id') is not None
    return render(request,'home.html', {'is_logged_in': is_logged_in})

def view_product(request):
    products = Product.objects.all()  # Ensure you have products in DB
    return render(request,'product.html', {'products': products})


def cart(request):
    return render(request,'cart.html')

def register_view(request):
    if request.method == 'POST':
        f = registerform(request.POST)
        f.save()
        return redirect('/login')
    else:
        f=registerform()
        d={'form':f}
        return render(request,'register.html',d)
    
def login_view(request):
    if request.method == "POST":
        uname = request.POST.get('username')
        passw = request.POST.get('password')
        user = Register.objects.filter(username=uname, password=passw).first()
        print(uname, passw)
        print(user)

        if user:
            # Set session
            request.session['user_id'] = user.id
            request.session['username'] = user.username

            if user.is_default_password:
                return redirect('forcepassword')
            # Retrieve the stored redirect URL (if available)
            next_url = request.session.pop('redirect_url', None)

            # Nested if-else to check session before redirecting
            if request.session.get('user_id'):
                username = request.session.get('username')
                return redirect(next_url if next_url else '/')
            else:
                return redirect('login')

        else:
            f = LoginForm()
            con = {'form': f, 'error': 'Invalid username or password'}
            return render(request, "login.html", con)

    else:
        # Store the next URL in session if provided in GET request (from checkout or billing page)
        if 'next' in request.GET:
            request.session['redirect_url'] = request.GET['next']
        
        f = LoginForm()
        con = {'form': f}
        return render(request, "login.html", con)

   
def logout_view(request):
    request.session.flush()
    messages.success(request, "You have logged out successfully.")
    return redirect('/')

from django.shortcuts import get_object_or_404, redirect
from .models import Product, Cart

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    
    return redirect('cart_view')

from .models import Register,AdminPasswordResetForm

def bill(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect(f'/login/?next={request.path}')

    try:
        user = Register.objects.get(id=user_id)
    except Register.DoesNotExist:
        return redirect('/login/')

    cart = request.session.get('cart', [])
    total_price = sum(item['price'] * item['quantity'] for item in cart)

    context = {
        'cart': cart,
        'total_price': total_price,
        'user': user,
    }

    return render(request, 'bill.html', context)

def forget_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = Register.objects.get(email=email)
            messages.success(request, f'Your password is: {user.password}')
        except Register.DoesNotExist:
            messages.error(request, 'Email not registered.')
        return redirect('forget')
    
    return render(request, 'forget.html')

DEFAULT_PASSWORD = 'Temp@1234'

from django.contrib.auth.hashers import make_password



def admin_reset_password(request):
    if request.method == 'POST':
        form = AdminPasswordResetForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                user = Register.objects.get(email=email)

                # Generate a random 4-digit password
                random_password = str(random.randint(1000, 9999))

                user.password = random_password
                user.is_default_password = True
                user.save()

                messages.success(request, f"Password for {email} has been reset to {random_password}")
            except Register.DoesNotExist:
                messages.error(request, "User with that email doesn't exist.")
            return redirect('admin-reset-password')
    else:
        form = AdminPasswordResetForm()
    
    return render(request, 'admin_reset_password.html', {'form': form})



def forcepassword(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # If not logged in

    user = Register.objects.get(id=user_id)

    if request.method == 'POST':
        form = ForcePasswordChangeForm(request.POST)
        if form.is_valid():
            new_password = form.cleaned_data['new_password']
            user.password = new_password
            user.is_default_password = False  # ✅ clear default password flag
            user.save()

            messages.success(request, "Password changed successfully. Please log in again.")
            request.session.flush()  # ✅ clear session for fresh login
            return redirect('login')
    else:
        form = ForcePasswordChangeForm()

    return render(request, 'force_password_change.html', {'form': form})