// Slideshow declarationn and set its initial value 0
var slideIndex = 0;
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

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Increment index and go back to the first one if the new index is greater than the length
  // which means that no more slides to show , so return back
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Display the current slide in a block style
  slides[slideIndex - 1].style.display = "block";

  // Call showSlides() again after 1.5 seconds
  setTimeout(showSlides, 1500);
}
// calling the function to start
showSlides();

// if there is a user loged in
if (info) {
  // change the login button to logout
  login_link.innerText = "logout";
  login_link.href = "home.html";
  login_link.addEventListener("click", (e) => {
    logout();
  });
} else {
  // change the inner text to sign in
  login_link.innerText = "login";
  login_link.href = "signin.html";
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
  }
});
