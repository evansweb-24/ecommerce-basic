// detail.js
const CART_KEY = 'cart';

async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

 

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

    // Simpan ke window supaya bisa dipakai saat Add to Cart
    window.currentProduct = product;
  } catch (err) {
    console.error("Gagal memuat detail produk:", err);
  }
}

function saveToCart(product) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  loadDetail();

  document.getElementById("add-to-cart").addEventListener("click", () => {
    if (window.currentProduct) {
      saveToCart(window.currentProduct);
      
    }
  });
});
