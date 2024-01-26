var proId = JSON.parse(localStorage.getItem("proId"));
if (proId !== null) {
  fetch(`https://dummyjson.com/products/${proId}`)
    .then((res) => res.json())
    .then((product) => {
      product;
      displyDetails(product);
      console.log(product);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  function displyDetails(product) {
    var img = document.getElementsByClassName("wrapper-image")[0];
    img.setAttribute("src", product.thumbnail);
    var category = document.getElementsByClassName("badge badge-darken")[0];
    category.innerHTML = product.brand;
    var name = document.getElementsByClassName("heading-sm font-bold")[0];
    name.innerHTML = product.title;
    var description = document.getElementsByClassName(
      "text-md font-regular"
    )[0];
    description.innerHTML = product.description;
    var price = document.getElementsByClassName("text-xxl font-bold")[0];
    price.innerHTML = "$" + product.price;
    var disCount = document.getElementsByClassName("discount")[0];
    disCount.innerHTML = product.discountPercentage + "%";
    var myDiv1 = document.getElementsByClassName("wrapper-action")[0];
    var myDiv2 = document.createElement("div");
    myDiv2.innerHTML = `

    <div class="quantity">
        <button class="plus" onclick="changeQuantity('${product.id}', 'plus')">+</button>
        <span id="quantity-${product.id}">1</span>
        <button class="minus" onclick="changeQuantity('${product.id}', 'minus')">-</button>
    </div>
    <button class="btn btn-darken"  id="btn-add" onclick="addToCart('${product.id}', '${product.thumbnail}', '${product.title}', ${product.price}, ${product.price})">Add to Cart</button>

    `;
    myDiv1.appendChild(myDiv2);
  }

  var userId = JSON.parse(localStorage.getItem(`idUser`));
  function addToCart(productId, productImage, productName, price) {
    var quantity = parseInt(
      document.getElementById(`quantity-${productId}`).innerText
    );
    var userId = JSON.parse(localStorage.getItem(`idUser`));
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    var existingItem = existingCart.find(
      (item) => item.productId === productId
    );
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
      var existingCart =
        JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
      // console.log(existingCart[1].quantity)
      var q = 0;
      for (var i = 0; i < existingCart.length; i++) {
        q += existingCart[i].quantity;
      }
      this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
    } else {
      this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = 0;
    }
  });
  document.addEventListener("click", function () {
    var userId = JSON.parse(localStorage.getItem(`idUser`));
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    // console.log(existingCart[1].quantity)
    if (userId !== null) {
      var q = 0;
      for (var i = 0; i < existingCart.length; i++) {
        q += existingCart[i].quantity;
      }
      this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
    } else {
      this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = 0;
    }
  });
}
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
