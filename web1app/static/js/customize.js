// Cart initialization (sessionStorage)
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Function to save cart to sessionStorage
function saveCartToStorage() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count in UI
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Find cart count element and update it
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    } else {
        console.log("⚠️ cart-count element not found on this page!");
    }
}


// Function to render cart in UI
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${item.name} - ${item.quantity} x $${item.price}</p>`;
        cartContainer.appendChild(div);
    });
}

// Function to add product to cart
function addToCart(id, name, price, image) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

// Function to clear cart
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

// Event to clear cart when browser is closed
window.addEventListener('beforeunload', function () {
    sessionStorage.removeItem('cart');
});

// Initial UI update
updateCartCount();
renderCart();
// ***********************************************************************************
function logoutUser() {
    console.log('Logging out user and clearing cart...');

    // Clear cart properly
    sessionStorage.removeItem('cart'); // Ensure session storage is cleared
    cart = []; // Clear the cart array in memory

    updateCartCount(); // Update UI after clearing cart
    renderCart(); 

    console.log('Cart cleared:', sessionStorage.getItem('cart'), cart);

    // Send logout request
    fetch('/logout/', {
        method: 'GET',
        credentials: 'same-origin',
    })
    .then(response => {
        console.log('Logout response:', response.status);
        if (response.ok) {
            console.log('Successfully logged out. Redirecting...');
            setTimeout(() => {
                window.location.href = '/';
            }, 500); // Delay to ensure storage clears before redirection
        } else {
            console.error('Logout failed:', response);
            alert('Logout failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Logout request error:', error);
        alert('An error occurred while logging out.');
    });
}

function saveCartToLocalStorage() { //Cart ko save karne ke liye ek function banaya gaya hai, jo localStorage mein save karega.
    localStorage.setItem('cart', JSON.stringify(cart)); //Cart ko string format mein convert karke localStorage mein save kar diya, taaki data reload hone par ya dubara page open karne par rahe.
}

function calculateTotal() { //Yeh ek function hai jiska kaam total price calculate karna hai.
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);//Yeh line cart ke items ke price aur quantity ko multiply karke total price calculate kar rahi hai. reduce method ko use kiya gaya hai, jisme har item ki price ko uske quantity ke saath multiply kiya ja raha hai, aur phir sari values ko add kiya ja raha hai. 0 starting value hai total ke liye.
} //Function yeh calculateTotal function total price ka result return karta hai.

// Render cart items
function renderCart() {
    const cartTab = document.querySelector('.cart-tab');
    if (!cartTab) {
        return; // Stop execution if cartTab is not found
    }

    const listCart = cartTab.querySelector('.list-cart');
    if (!listCart) {
        return;
    }

    const totalPriceElement = document.getElementById('total-price');
    if (!totalPriceElement) {
        console.error('Error: Element with id "total-price" not found.');
        return;
    }

    // Clear previous items
    listCart.innerHTML = '';

    // Render cart items
    cart.forEach((item) => {
        listCart.innerHTML += `
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: auto; height: 60px;" />
                ${item.name} - $${item.price} x ${item.quantity}<br>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    // Update total price
    totalPriceElement.textContent = calculateTotal().toFixed(2);

    // Show or hide the cart based on its content
    cartTab.style.display = cart.length ? 'block' : 'none';
}

// Remove item from the cart
function removeFromCart(id) { //Yeh ek function hai jo cart se kisi item ko remove karne ka kaam karta hai.
    cart = cart.filter((item) => item.id !== id); //Yeh line cart array ko filter kar rahi hai. Filtered array mein sirf woh items rahenge jo selected item ke id se match nahi karte. Isse selected item remove ho jata hai.
    saveCartToLocalStorage(); //Yeh line updated cart ko localStorage mein save karti hai taaki page reload par bhi cart data save rahe.
    updateCartCount(); //Yeh line cart ke total items ka count update karti hai jo cart icon mein dikhayi deta hai.
    renderCart(); //Yeh line cart ko dobara se render (display) karti hai, taaki changes (jaise item remove hona) user ko turant nazar aaye.
}

// Clear the entire cart
function clearCart() { //Yeh ek function hai jo cart ko completely clear (empty) karne ka kaam karta hai.
    localStorage.removeItem('cart'); //Yeh line localStorage se cart ka item remove kar deti hai, jisse cart ka data storage se delete ho jata hai.
    cart = []; //Yeh line cart array ko empty array se replace kar deti hai, jisse cart reset ho jata hai.
    updateCartCount(); //Yeh line cart ke item count ko update karti hai, jisse cart icon mein total items ka correct count dikhayi deta hai.
    renderCart(); //Yeh line updated (empty) cart ko render karti hai taaki UI pe cart ka empty state dikhayi de.
}
function redirectToProductPage(element) { //Yeh function product page par redirect karne ka kaam karta hai jab koi product select kiya jata hai.
    const id = parseInt(element.dataset.id); //Yeh line data-id attribute se product ki ID ko retrieve karke usko integer mein convert karti hai.
    const name = element.dataset.name; //Yeh line data-name attribute se product ka naam fetch kar rahi hai.
    const price = parseInt(element.dataset.price); //Yeh line data-price attribute se product ki price ko retrieve karte hue integer mein convert karti hai.
    const image = element.querySelector('img').src; //Yeh line product ke image ka source (src) fetch karti hai.

    // Add item to the cart
    addToCart(id, name, price, image); //Yeh line product ko cart mein add karne ke liye addToCart function call karti hai, jo id, name, price aur image pass karti hai.

    // Flying animation
    const img = element.querySelector('img'); //Yeh line selected product ke image element ko fetch karti hai.
    const cart = document.querySelector('.cart-tab'); //Yeh line cart container ko select karti hai (jo class .cart-tab se identified hai).

    // Clone image for animation
    const flyingImg = img.cloneNode(true); //Yeh line selected product ke image ka clone banati hai, taki flying effect dikhaya ja sake.
    flyingImg.style.position = 'fixed'; //Yeh line cloned image ko fixed position de deti hai jisme image ka position page par stationary hoga.

    // Set the starting position based on image location
    const rect = img.getBoundingClientRect(); //Yeh line image ka bounding box ke dimensions (position aur size) ko fetch karti hai.
    const cartRect = cart.getBoundingClientRect(); //Yeh line cart ke bounding box ke dimensions ko fetch karti hai.
    flyingImg.style.left = `${rect.left}px`; //Yeh line flying image ka left position set karti hai, jisse image wahi se start ho jaye jahan original image hai.
    flyingImg.style.top = `${rect.top}px`; //Yeh line flying image ka top position set karti hai, jisse image vertical direction mein apni original image ke position se start hoti hai.
    flyingImg.style.width = `${rect.width}px`; //Yeh line flying image ko original image ki width de deti hai.
    flyingImg.style.height = `${rect.height}px`; //Yeh line flying image ko original image ki height de deti hai.
    flyingImg.style.transition = 'all 1s ease'; //Yeh line flying image ko smooth animation dene ke liye transition set karti hai.
    flyingImg.style.zIndex = 1000; //Yeh line flying image ko screen par top layer pe display karne ke liye zIndex 1000 set karti hai, jisse yeh dusre elements ke upar rahe.
    
    document.body.appendChild(flyingImg); //Yeh line flying image ko DOM (Document Object Model) mein body ke andar append kar deti hai, taaki yeh page par dikhai de.

    // Move the image to the cart's position
    requestAnimationFrame(() => { //Yeh function call ek smooth animation schedule karta hai, jo browser ko batata hai ki animation render karne se pehle ek frame ka request hai.
        flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`; //Yeh line flying image ko cart ke exact center tak move karne ke liye uske left position ko set karti hai.cartRect.left cart ke left position ko represent karta hai, aur cartRect.width / 2 half width ko add karke cart ke center ka position milta hai.
        flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`; //Yeh line flying image ko cart ke exact center tak vertically move karne ke liye top position ko set karti hai.
        flyingImg.style.width = '0px'; //Yeh line flying image ki width ko gradually zero kar deti hai, jisse image chhoti hone lagti hai animation ke dauraan.
        flyingImg.style.height = '0px'; //Yeh line flying image ki height ko gradually zero kar deti hai, jisse image vertically bhi chhoti ho jati hai.
        flyingImg.style.opacity = '0.5'; //Yeh line flying image ki opacity ko set karti hai, jisse image dheere-dheere transparent hoti hai.
    });

    // Clean up the animation element
    flyingImg.addEventListener('transitionend', () => flyingImg.remove()); //Yeh line transition effect ke end hone par transitionend event ko listen karti hai, aur jab transition complete ho jati hai, tab flying image ko DOM se remove kar deti hai.
}

// Initialize cart on page load

// Increase quantity
function increaseQuantity(id) { //Yeh function increaseQuantity ka definition hai jo kisi product ka quantity badhane ke liye use hota hai, id ke through us product ko identify karte hain.
    const product = cart.find((item) => item.id === id); //Yeh line cart array mein se us product ko dhoondti hai jiska id parameter ke id ke barabar ho.
    if (product) { //Agar product found hai, to uska quantity ek se badha diya jata hai.
        product.quantity++; //Agar product found hai, to uska quantity ek se badha diya jata hai.
    }
    saveCartToLocalStorage();//Yeh function cart ko localStorage mein save karne ke liye call hota hai, taki cart ka data session ke baad bhi persist ho.
    updateCartCount();//Yeh function cart ke items ka count update karta hai jo page par display hota hai.
    renderCart(); //Yeh function cart ke items ko visual form mein render karta hai.
}

// Decrease quantity
function decreaseQuantity(id) {//Yeh function decreaseQuantity ka definition hai jo kisi product ka quantity kam karne ke liye use hota hai, id ke through product ko identify karte hain.
    const product = cart.find((item) => item.id === id); //Yeh line cart mein se us product ko dhoondti hai jiska id parameter ke id ke barabar ho.
    if (product && product.quantity > 1) { //Agar product found hai aur uska quantity 1 se zyada hai, to uska quantity ek se kam kar diya jata hai.
        product.quantity--; //Agar product found hai aur uska quantity 1 se zyada hai, to uska quantity ek se kam kar diya jata hai.
    }
    saveCartToLocalStorage();//Cart ko localStorage mein dubara save karne ke liye yeh function call hota hai.
    updateCartCount(); //Yeh function cart ki total quantity ko update karta hai jo page pe visible hota hai.
    renderCart(); //Cart ke items ko re-render karta hai aur updated quantity ke saath unhe display karta hai.
}
    
window.onload = function () { //Yeh event listener ka code hai jo tab execute hota hai jab window (web page) completely load ho jati hai.
    updateCartCount(); //Yeh function call karti hai jo cart ke items ki total quantity ko update karti hai aur page pe display karti hai.
    renderCart(); //Yeh function call karti hai jo cart ke items ko page par render karti hai, matlab cart mein jo bhi items hain, unhe visual display pe dikhayi deti hain.
    
    document.querySelector('.close').addEventListener('click', closeCart);//Yeh line close button (.close class wali element) pe click hone par closeCart function ko trigger karti hai, jo cart ko hide karega.
    document.querySelector('.clear').addEventListener('click', clearCart); //Yeh line clear button (.clear class wali element) pe click hone par clearCart function ko trigger karti hai, jo cart ko completely empty kar degi.
    };
