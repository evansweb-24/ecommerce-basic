const CART_KEY = 'cart';

function formatRupiah(amount) {
  return '$' + amount.toLocaleString('id-ID');
}

function renderCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const container = document.getElementById('checkout-items');
  const totalHargaEl = document.getElementById('total-harga');

  container.innerHTML = '';
  let totalHarga = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalHarga += itemTotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center space-x-4 border-b pb-4';

    itemEl.innerHTML = `
      <img src="${item.image}" class="w-16 h-16 object-contain" alt="${item.title}" />
      <div class="flex-1">
        <h2 class="font-semibold text-sm">${item.title}</h2>
        <p class="text-sm">Harga: ${formatRupiah(item.price)}</p>
        <p class="text-sm">Jumlah: ${item.quantity}</p>
        <p class="text-sm font-medium">Subtotal: ${formatRupiah(itemTotal)}</p>
      </div>
    `;

    container.appendChild(itemEl);
  });

  totalHargaEl.textContent = formatRupiah(totalHarga);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutItems();

  document.getElementById('buat-pesanan').addEventListener('click', () => {
    const alamat = document.querySelector('textarea').value.trim();
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    if (cart.length === 0) {
      alert("Keranjang Anda kosong. Tambahkan produk terlebih dahulu.");
      return;
    }

    if (!alamat) {
      alert("Silakan isi alamat lengkap Anda terlebih dahulu.");
      return;
    }

    // Simulasi pesanan berhasil
    alert("✅ Pesanan berhasil dibuat! Terima kasih telah berbelanja.");
    
    // Kosongkan cart
    localStorage.removeItem(CART_KEY);

    // Redirect ke halaman pembayaran
    window.location.href = "/public/Pembayaran.html";
  });
});
