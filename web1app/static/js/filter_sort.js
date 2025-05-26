function filterProducts() {
    let selectedCategory = document.getElementById("category").value.toLowerCase();
    let products = document.querySelectorAll(".menu-item");

    console.log("Selected Category:", selectedCategory);  // Debugging log

    products.forEach(product => {
        let category = product.getAttribute("data-category").toLowerCase();
        console.log("Product Category:", category);  // Debugging log

        if (selectedCategory === "all" || category === selectedCategory) {
            product.style.display = "block"; // Show product
        } else {
            product.style.display = "none";  // Hide product
        }
    });
}
function sortProducts() {
    let selectedSort = document.getElementById("sort").value;
    let container = document.querySelector(".products");
    let products = Array.from(document.querySelectorAll(".menu-item"));

    // Filter only visible products
    let visibleProducts = products.filter(product => product.style.display !== "none");

    // Sort logic
    visibleProducts.sort((a, b) => {
        if (selectedSort === "price-asc") {
            return parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price"));
        } else if (selectedSort === "price-desc") {
            return parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price"));
        } else if (selectedSort === "id-asc") {  // Changed from "name" to "id-asc"
            return parseInt(a.getAttribute("data-id")) - parseInt(b.getAttribute("data-id"));
        }
        return 0;
    });

    // Clear and re-append sorted products
    container.innerHTML = "";
    visibleProducts.forEach(product => container.appendChild(product));
}

// Attach event listener
document.getElementById("sort").addEventListener("change", sortProducts);
