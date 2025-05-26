document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartCount = document.getElementById("cart-count");
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);

    function showToast(message) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 2500);
    }

    function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Ensure cartCount exists before updating
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}


    function addToCart(event) {
        event.stopPropagation();
        const item = event.target.closest(".menu-item");
        if (!item) return;

        const product = {
            id: item.getAttribute("data-id"),
            name: item.getAttribute("data-name"),
            price: parseFloat(item.getAttribute("data-price")),
            category: item.getAttribute("data-category"),
            image: item.querySelector("img")?.src || "",
            quantity: 1
        };

        let existingItem = cart.find(cartItem => cartItem.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`✅ ${product.name} added to cart!`);
        updateCartCount();
        displayCartItems();
    }

    function displayCartItems() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            return;
        }
        emptyCartMessage.style.display = "none";

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price*item.quantity}</p>
                <p>Category: ${item.category}</p>
                <div class="quantity-controls">
                    <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.changeQuantity = function (index, change) {
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity < 1) {
                cart.splice(index, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    };

    document.querySelectorAll(".menu-item button").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("clear")) {
            clearCart();
        }
        if (event.target.classList.contains("logout")) {
            clearCart();
        }
    });
    
    function clearCart() {
        localStorage.removeItem("cart");
        cart = [];
        updateCartCount();
        displayCartItems();
    }

    
    updateCartCount();
    displayCartItems();
});
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    if (cartItems.children.length === 0) {
        cartItems.style.display = "none";
        emptyCartMessage.style.display = "block"; 
    } else {
        cartItems.style.display = "block";
        emptyCartMessage.style.display = "none"; 
    }
});
