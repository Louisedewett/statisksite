const params = new URLSearchParams(window.location.search);
const myCategories = params.get("categories");

console.log(myCategories);

//const productURL = "https://kea-alt-del.dk/t7/api/categories";

const fetchURL = myCategories ? `https://kea-alt-del.dk/t7/api/categories=${encodeURIComponent(myCategories)}` : "https://kea-alt-del.dk/t7/api/categories";
const listContainer = document.querySelector(".grid1-3");

function getCategories() {
  fetch(fetchURL).then((res) => res.json().then((categories) => showCategories(categories)));
}

function showCategories(categories) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter
  categories.forEach((category) => {
    listContainer.innerHTML += `
      

        

            <a href="productlist.html?category=${encodeURIComponent(category.category)}" class="card1">${category.category}</a>



       
    `;
  });
}

getCategories();
