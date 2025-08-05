const CART_KEY = 'cart';
const cartItemsContainer = document.querySelector('.md\\:col-span-2');
const summaryContainer = document.querySelector('.bg-gray-50');

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatRupiah(amount) {
  return '$ ' + amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).replace(/^Rp/, '').trim();
}

function updateQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = parseInt(quantity) || 1;
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;
  let totalQty = 0;

  cart.forEach(item => {
    const total = item.price * item.quantity;
    subtotal += total;
    totalQty += item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center gap-4 border p-4 rounded-lg shadow-sm';
    itemEl.innerHTML = `
      <input type="checkbox" class="item-checkbox" data-id="${item.id}" checked />
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg" />
      <div class="flex-1">
        <h3 class="font-semibold text-lg">${item.title}</h3>
        <p class="text-sm text-gray-500">${formatRupiah(item.price)}</p>
        <div class="mt-2 flex items-center gap-2">
          <input type="number" value="${item.quantity}" min="1" class="w-16 px-2 py-1 border rounded quantity-input" data-id="${item.id}" />
          <button class="text-red-500 hover:underline text-sm remove-btn" data-id="${item.id}">Hapus</button>
        </div>
      </div>
      <div class="text-right font-semibold">${formatRupiah(total)}</div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  // Tampilkan total produk dan harga ke elemen jika ada
  const totalProductEl = document.getElementById('total-product');
  const totalPriceEl = document.getElementById('total-price');
  const totalAllEl = document.getElementById('total-all');

  if (totalProductEl) totalProductEl.textContent = totalQty;
  if (totalPriceEl) totalPriceEl.textContent = formatRupiah(subtotal);
  if (totalAllEl) totalAllEl.textContent = formatRupiah(subtotal);

  attachEventListeners();
  updateSummary(); // Tambahkan ini agar ringkasan langsung muncul
}

function updateSummary() {
  const cart = getCart();
  const checkedIds = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => parseInt(cb.dataset.id));
  const selectedItems = cart.filter(item => checkedIds.includes(item.id));

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  const productSummaryHTML = selectedItems.map(item => `
    <div class="mb-2">
      <h4 class="font-medium text-sm">${item.title}</h4>
      <p class="text-xs text-gray-600 line-clamp-2">${item.description || 'Tidak ada deskripsi.'}</p>
    </div>
  `).join('');

  summaryContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Ringkasan</h3>
    <div class="mb-4 space-y-2">${productSummaryHTML || '<p class="text-sm text-gray-400">Tidak ada produk yang dipilih.</p>'}</div>
    <div class="flex justify-between mb-2"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="flex justify-between mb-2"><span>Pajak</span><span>${formatRupiah(tax)}</span></div>
    <hr class="my-2" />
    <div class="flex justify-between font-semibold text-lg"><span>Total</span><span>${formatRupiah(grandTotal)}</span></div>
    <button class="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">Checkout</button>
    <button id="clear-cart" class="w-full mt-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">Kosongkan Keranjang</button>
  `;

  // Tambahkan event untuk tombol kosongkan keranjang
  const clearCartBtn = document.getElementById("clear-cart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
        localStorage.removeItem(CART_KEY);
        renderCart();
      }
    });
  }
}

function attachEventListeners() {
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      updateQuantity(id, e.target.value);
    });
  });

  document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSummary);
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}

renderCart(); // Jalankan saat halaman dimuat
document.getElementById("checkout-btn").addEventListener("click", () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  // Simpan data keranjang jika belum disimpan (opsional)
  localStorage.setItem("checkoutData", JSON.stringify(cart));

  // Arahkan ke halaman checkout
  window.location.href = "/public/checkout.html";
});

