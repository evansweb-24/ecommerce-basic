// function.js
async function ambilData() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const container = document.getElementById("data-product");
  
      if (!container) {
        console.error("Element dengan id 'data-product' tidak ditemukan.");
        return;
      }
  
      data.forEach((product) => {
        const postElement = document.createElement("div");
        postElement.className = "bg-white p-4 border rounded-lg shadow hover:shadow-lg transition";
  
        postElement.innerHTML = `
        <img src="${product.image}" 
               alt="${product.title}" 
               data-id="${product.id}" 
               class="w-full h-48 object-contain mx-auto mt-2 cursor-pointer hover:scale-105 transition duration-200" />
  
          <h3 class="text-md font-semibold mt-4 truncate">${product.title}</h3>
          <p class="text-sm text-gray-600 mt-2 truncate ">${product.description} </p>
          <p class="text-lg font-bold text-blue-700 mt-2">$${product.price.toFixed(2)}</p>
  
          <div class="mt-4 flex gap-2">
            <button class="bg-blue-700 text-white px-3 py-1 rounded w-full hover:bg-gray-800 btn-detail">
              Detail
            </button>
          </div>
        `;
  
        const detailPage = "detail.html";
  
        // Event untuk gambar dan tombol "Detail"
        const img = postElement.querySelector("img");
        const btnDetail = postElement.querySelector(".btn-detail");
  
        [img, btnDetail].forEach(el => {
          el.addEventListener("click", () => {
            window.location.href = `${detailPage}?id=${product.id}`;
          });
        });
  
        container.appendChild(postElement);
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }
  
  ambilData();
  