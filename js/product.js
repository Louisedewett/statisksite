const id = 1163;
const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  productcontainer.innerHTML = `
          <article class="information">
            <img src="https://kea-alt-del.dk/t7/images/webp/1000/${id}.webp" alt="pic1">
            <div class="text">
                <h3>${data.productdisplayname}</h3>
                <p class="brand"> ${data.brandname}</p>
                <p class="price"> ${data.price}</p>
                <p class="lagerstatus">På lager</p>
                <button class="knap">Tilføj til kurv</button>

            </div>
        </article>
  `;
}

getData();
