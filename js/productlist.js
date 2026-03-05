const params = new URLSearchParams(window.location.search);
const myCategory = params.get("category");

console.log(myCategory);

//const listURL = "https://kea-alt-del.dk/t7/api/products";
//const fetchURL = `https://kea-alt-del.dk/t7/api/products?category=${myCategory}`;
const fetchURL = myCategory ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(myCategory)}&limit=20` : "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".product-gallery");
const sorteringsknap = document.querySelector("#sortbyprice");
const filtreingsknap = document.querySelector("#filterbycategory");

console.log("knap virker");

let allProducts = [];

function getProducts() {
  fetch(fetchURL)
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      showProducts(allProducts);
    });
}

// function getProducts() {
//   fetch(fetchURL).then((res) => res.json().then((products) => showProducts(products)));
// }

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter
  products.forEach((product) => {
    const soldout = product.soldout == 1 ? `<div class="soldout">Sold out</div>` : "";

    listContainer.innerHTML += `
      

                <div class="product-card">
                  <a href="product.html?id=${product.id}" class="billede-card"> 
               
                        ${soldout}
                        ${product.discount > 0 ? `<div class="discount">${product.discount}%</div>` : ""}
                        <img src="https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp" alt="pic1">
                    </a>
                    <div class="produkt-tekst">
                        <div class="tesktogpris">
                            <h3>${product.productdisplayname}</h3>

 <div class="pricex2">
  ${
    product.discount && product.discount > 0
      ? `
        <p class="old-price"> ${product.price} kr.</p>
        <p class="new-price">
          Now ${(product.price * (1 - product.discount / 100)).toFixed(2)} kr.
        </p>
      `
      : `
        <p class="price">${product.price} kr.</p>
      `
  }
</div>


                          
                        </div>
                        <p class="brand">${product.brandname}</p>
                      <a href="product.html?id=${product.id}" class="link">Read more</a>
                            

                    </div>

                </div>
    `;
  });
}
function sorteringsknapAsc() {
  console.log("knap virker");
  const sorted = [...allProducts].sort((a, b) => a.price - b.price);
  showProducts(sorted);
}

sorteringsknap.addEventListener("click", sorteringsknapAsc);

function filterByGender(targetGender) {
  const filtered = allProducts.filter((product) => (product.gender || "").toLowerCase() === targetGender.toLowerCase());

  showProducts(filtered);
}

filterbycategory.addEventListener("click", () => filterByGender("Women"));

getProducts();
