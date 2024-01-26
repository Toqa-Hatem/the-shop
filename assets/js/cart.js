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

var userId = JSON.parse(localStorage.getItem(`idUser`));
document.addEventListener("DOMContentLoaded", function () {
  var userId = JSON.parse(localStorage.getItem(`idUser`));
  var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
  // console.log(existingCart[1].quantity)
  if(userId !== null){
    var q = 0;
    for (var i = 0; i < existingCart.length; i++) {
      q += existingCart[i].quantity;
    }
    this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
  }
});
document.addEventListener("click", function () {
  var userId = JSON.parse(localStorage.getItem(`idUser`));
  var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
  // console.log(existingCart[1].quantity)
  if(userId !== null){
    var q = 0;
    for (var i = 0; i < existingCart.length; i++) {
      q += existingCart[i].quantity;
    }
    this.documentElement.getElementsByClassName("q-cart")[0].innerHTML = q;
  }
});

if (userId != null) {
  document.addEventListener("DOMContentLoaded", function () {
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    displayCartItems(existingCart);
    var clearButton = document.getElementById("clear-cart");
    clearButton.addEventListener("click", () => {
      clearCart();
      displayCartItems([]);
    });
  });

  function displayCartItems(cartItems) {
    var cartItemsContainer = document.getElementById("cart-items");
    var cartTotalSpan = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    var cartTotal = 0;
    for (var item of cartItems) {
      var itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-container");
      itemDiv.innerHTML = `
                <div class="image"><img src="${item.productImage}"/></div>
                <div class="details">
                    <p>${item.productName}</p>
                    <p>Price: $${item.price}</p>
                </div>
                <div class="actions">
                    <div class="btn">
                        <button onclick="changeQuantity('${
                          item.productId
                        }', 'plus')">+</button>
                        <p >${item.quantity}</p>
                        <button onclick="changeQuantity('${
                          item.productId
                        }', 'minus')">-</button>
                    </div>
                    <div class="other">
                        <button class="delete" onclick="removeItem('${
                          item.productId
                        }')">Delete</button>
                        <p class="total">Total: $${
                          item.price * item.quantity
                        }</p>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(itemDiv);
      cartTotal += item.price * item.quantity;
    }
    cartTotalSpan.textContent = cartTotal.toFixed(2);
  }

  function changeQuantity(productId, action) {
    var userId = JSON.parse(localStorage.getItem(`idUser`));
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    var itemIndex = existingCart.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex !== -1) {
      var quantityElement = document.getElementById(`quantity-${productId}`);
      var currentQuantity = existingCart[itemIndex].quantity;
      if (action === "plus") {
        currentQuantity++;
      } else if (action === "minus" && currentQuantity > 0) {
        currentQuantity--;
      }
      existingCart[itemIndex].quantity = currentQuantity;
      localStorage.setItem(`cart-${userId}`, JSON.stringify(existingCart));
      displayCartItems(existingCart);
    }
  }

  function removeItem(productId) {
    var userId = JSON.parse(localStorage.getItem(`idUser`));
    var existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    existingCart = existingCart.filter((item) => item.productId !== productId);
    localStorage.setItem(`cart-${userId}`, JSON.stringify(existingCart));
    displayCartItems(existingCart);
  }

  function clearCart() {
    var userId = JSON.parse(localStorage.getItem(`idUser`));
    localStorage.removeItem(`cart-${userId}`);
  }

  function checkout() {
    var checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.style.display = "flex";
  }

  function closeCheckoutModal() {
    var checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.style.display = "none";
  }
}
if (userId == null) {
  document.getElementById("pr").classList.add("disNone");
  document.getElementById("btn1").classList.add("disNone");
  document.getElementById("clear-cart").classList.add("disNone");
  var cont = document.getElementsByClassName("container")[0];
  var myDiv1 = (cont.innerHTML =
    `
    <div class="loginReq">
        <div class="loginReqImg">
            <img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" alt="Nice Day">
        </div>
        <div class="detailsReq">
            <h2>Your Cart Empty Login First!</h2>
            <p><a href="../products.html">Products Today</a></p>
            <button class="btnLog"><a style="text-decoration: none; color: white" href="../signin.html">Sign in To Your Acoount</a></button>
        </div>
        
    </div>
    ` +
    `
    <div class="loginRe">
        <p>
            The price and availability of items at MyShopinng.com are subject to change. 
            The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
            Shopping Cart Learn moreDo you have a gift card or promotional code? We'll ask you to enter your claim code 
            when it's time to pay.
        </p>
    </div
    `);
}
