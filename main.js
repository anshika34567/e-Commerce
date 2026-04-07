const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        image: "wireless headphone.jpeg",
        featured: true
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 89.99,
        image: "smart wattch.jpeg",
        featured: false
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 29.99,
        image: "b_speaker.jpeg",
        featured: true
    },
    {
        id: 4,
        name: "VR Headset",
        price: 99.99,
        image: "vr headsettt.jpeg",
        featured: false
    }
];

// Utility functions for cart
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $("#cart-count").text(count);
    // Optional: show cart count in page title
    if (count > 0) {
        document.title = `(${count}) MyStore`;
    } else {
        document.title = "MyStore";
    }
}

$(document).ready(function() {
    // Render products
    let html = "";
    const path = window.location.pathname;
    const isHome = path.endsWith("index.html") || path.endsWith("/index.html") || path.endsWith("/");
    let productsToShow = isHome ? products.filter(p => p.featured) : products;

    productsToShow.forEach(product => {
        html += `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='placeholder.png'">
                <div class="card-body d-flex flex-column">
                    ${product.featured ? '<span class="badge bg-warning text-dark mb-2">Featured</span>' : ''}
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
    });
    $("#product-list").html(html);

    // Add to cart button with quantity support
    $(".add-to-cart").click(function() {
        const productId = $(this).data("id");
        let cart = getCart();
        const index = cart.findIndex(item => item.id === productId);
        if (index > -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        saveCart(cart);
        updateCartCount();
        const product = products.find(p => p.id === productId);
        alert(`Added "${product.name}" to cart!`);
    });

    // Initialize cart count on page load
    updateCartCount();
});
