const listURL = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".product-gallery");

function getProducts() {
  fetch(listURL).then((res) => res.json().then((products) => showProducts(products)));
}

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter
  products.forEach((product) => {
    const soldout = product.soldout == 1 ? `<div class="soldout">Sold out</div>` : "";

    listContainer.innerHTML += `
      

                <div class="product-card">
                    <a href="product.html" class="billede-card">
               
                        ${soldout}
                        <img src="https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp" alt="pic1">
                    </a>
                    <div class="produkt-tekst">
                        <div class="tesktogpris">
                            <h3>${product.productdisplayname}</h3>
                            <p class="price"> ${product.price} kr.</p>
                        </div>
                        <p class="brand">${product.brandname}</p>
                    </div>

                </div>
    `;
  });
}

getProducts();
