var newLimit = 200;
var container = document.getElementById("container");
var searchInput = document.getElementById("searchInput");
function displayProducts(filteredProducts) {
  // Clear existing products
  container.innerHTML = "";

  for (let i = 0; i < filteredProducts.length; i++) {
    // catch the data of id , ... and put it in the array of i (index of product )
    var { id, category, title, images, price, description } =
      filteredProducts[i];
    //  create the div in the html document to display the returned products from api on it ,
    // put class and id to this div
    var productCard = document.createElement("div");
    productCard.className = "cards";
    productCard.id = id;
    // put the data in the html document by the index of each product in the array that we caught by json
    productCard.innerHTML = `
                    <div class="img">
                        <a href="onePro.html">
                            <img src="${
                              images[0]
                            }" width="500" height="567" alt="${title}" usemap="#product">
                        </a>
                    </div>
                    <div class="category">
                        <h4>${category}</h4>
                    </div>

                    <div class="description">
                        <h2>${title}</h2>
                    </div>

                    <div class="price">
                        <h3>${price + " $"}</h3>
                    </div>
                    <div class="quantity">
                      <button style="float: left; width:5%" class="plus" onclick="changeQuantity('${id}', 'plus')">+</button>
                      <span style="float: left; width:5%" id="quantity-${id}">1</span>
                      <button style="float: left; width:5%" class="minus" onclick="changeQuantity('${id}', 'minus')">-</button>
                      <button class="add" style="float: left; width:30%; cursor: pointer" 
                        onclick="addToCart('${id}', '${images[0]}', '${title}', '${price}')"
                      >Add To Cart</button>
                    </div>
                `;

    container.appendChild(productCard);
  }
}
// fetch data from the object and return it in a json to start the process on it
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    var products = data.products; // in this variable we save the data of the products that was included in api
    
    
    //  for the search
    // Initial display of all products
    displayProducts(products);

    // Add event listener for the search input and transform it all to lowercase to make it easy
    // found the results and be understandable
    // make a filter on this products by its title to find it on the search
    //  display only the searched products which matched the title
    searchInput.addEventListener("input", function () {
      const search = searchInput.value.toLowerCase();
      const searchProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search)
      );
      displayProducts(searchProducts);
    });
  });

  // one product 
var userId = JSON.parse(localStorage.getItem(`idUser`));
function addToCart(productId, productImage, productName, price) {
  var quantity = parseInt(
    document.getElementById(`quantity-${productId}`).innerText
  );
  var userId = JSON.parse(localStorage.getItem(`idUser`));
  var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
  var existingItem = existingCart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    existingCart.push({
      productId,
      productImage,
      productName,
      price,
      quantity,
    });
  }
  if (userId !== null) {
    // Save the updated cart data back to local storage
    localStorage.setItem(`cart-${userId}`, JSON.stringify(existingCart));
  } else {
    document.location = 'cart.html';
  }
}

function changeQuantity(productId, action) {
  var quantityElement = document.getElementById(`quantity-${productId}`);
  var currentQuantity = parseInt(quantityElement.innerText);
  if (action === "plus") {
    currentQuantity++;
  } else if (action === "minus" && currentQuantity > 1) {
    currentQuantity--;
  }
  quantityElement.innerText = currentQuantity;
}

document.addEventListener("DOMContentLoaded", function () {
  var userId = JSON.parse(localStorage.getItem(`idUser`));
  if (userId !== null) {
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    // console.log(existingCart[1].quantity)
    var q = 0;
    for (var i = 0; i < existingCart.length; i++) {
      q += existingCart[i].quantity;
    }
    this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
  } 
});
document.addEventListener("click", function (e) {
  var userId = JSON.parse(localStorage.getItem(`idUser`));
  var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
  // console.log(existingCart[1].quantity)
  if (userId !== null) {
    var q = 0;
    for (var i = 0; i < existingCart.length; i++) {
      q += existingCart[i].quantity;
    }
    this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
  }
});

var container = document.getElementById("container");
container.addEventListener("click", function (e) {
  var proId =
    e.target.parentElement.parentElement.parentElement.getAttribute("id");
  localStorage.setItem("proId", JSON.stringify(proId));
});

// fetch user info from local storage
let info = JSON.parse(localStorage.getItem("token"));
let login_link = document.getElementById("login_link");
const display_link = document.getElementById("display_link");

// if there is a user loged in
if (info) {
  // change the login button to logout
  login_link.innerText = "logout";
  login_link.href = "home.html";
  display_link.href = "display.html";
  login_link.addEventListener("click", (e) => {
    logout();
  });
} else {
  // change the inner text to sign in
  login_link.innerText = "login";
  login_link.href = "signin.html";
  display_link.href = "signin.html";
}

// categories
const options = document.getElementById("categories");
options.addEventListener("change", async (e) => {
  const selected = options.value;
  // if user selected all products
  if (selected !== "Categories") {
    // fetch the selected category
    let data = await fetch(
      `https://dummyjson.com/products/category/${selected}`
    );
    const prods = await data.json();
    const products = await prods.products;
    displayProducts(products);
  } else {
    // fetch all products
    let data = await fetch(`https://dummyjson.com/products`);
    const prods = await data.json();
    const products = await prods.products;
    displayProducts(products);
  }
  
});
