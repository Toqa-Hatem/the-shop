let info = JSON.parse(localStorage.getItem("token"));
let login_link = document.getElementById("login_link");


if (info) {
  login_link.innerText = "logout";
  login_link.href = "home.html";
  login_link.addEventListener("click", (e) => {
    logout();
  });
} else {
  login_link.innerText = "login";
  login_link.href = "signin.html";
}
async function displayUser(info) {
  let userData;
  if (info.id) {
    userData = await fetch(`https://dummyjson.com/users/${info.id}`).then(
      (res) => res.json()
    );
  }
  return userData;
}

async function drawUser() {
  var d = await displayUser(info);
  document.getElementById("userName").innerHTML = d.username;
  document.getElementById("age").innerHTML = d.age;
  document.getElementById("email").innerHTML = d.email;
  document.getElementById("firstName").innerHTML = d.firstName;
  document.getElementById("lastName").innerHTML = d.lastName;
  document.getElementById("gender").innerHTML = d.gender;
  document.getElementById("profile").src = d.image;
  console.log(info);
}

drawUser();



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
