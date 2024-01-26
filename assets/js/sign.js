// function hash(pass = "") {
//   /**
//    * hash - fucntion generate the same number everytime we put the same text
//    *
//    * @pass - the passsword text we want to hash
//    * Return: the generated value
//    */
//   let val = 0;
//   // iterate through password
//   for (let i = 0; i < pass.length; i++) {
//     // get the ascii code for this char
//     const asci = pass.charCodeAt(i);
//     // make calculation
//     val = (val << 4) - val + asci;
//     val |= 0; // like math.floor
//   }

//   return val;
// }

// select element
let sumbitBtn = document.getElementById("submit");
const err = document.getElementById("err_msg");
const userInput = document.getElementById("name");
const passInput = document.getElementById("pass");

// hide error message
if (err) err.style.display = "none";

let data;
async function login(uname, pass) {
  /**
   * login - fucntion to handle the login request
   *
   * @username - the input username
   * @password - the input password
   * Return: the login data
   */

  let data = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `${uname}`,
      password: `${pass}`,
      // expiresInMins: 60, // optional
    }),
  }).then((res) => res.json());

  console.log(data);
  localStorage.setItem("token", JSON.stringify(data));
  return data;
}

//uname: "kminchelle"
//pass: "0lelplR"
if (sumbitBtn) {
  sumbitBtn.addEventListener("click", async (e) => {
    // validate user input and log user into his/her account
    e.preventDefault();
    // get info from the html form
    let uname = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;
    if (!uname) {
      display_error("UserName Required");
      return;
    }
    if (!pass) {
      display_error("Password Required");
      return;
    }
    // wait for login function to finish fetching data
    data = await login(uname, pass);
    // if data return successfully
    if (data.id) {
      // set id in local storage
      localStorage.setItem("idUser", JSON.stringify(data.id));
      // redirect to home
      location.pathname = "../home.html";
    } else {
      // alert user
      display_error("Login Failed");
    }
  });
}

// hide err div on input
if (userInput)
  userInput.addEventListener("input", (e) => {
    err.style.display = "none";
  });

if (passInput)
  passInput.addEventListener("input", (e) => {
    err.style.display = "none";
  });

function logout() {
  //log user out and redirect back to home
  let key = localStorage.getItem("token");
  // if key exsist
  if (key) {
    // remove key from local storage and redirect back to home page
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    location.pathname = "home.html";
  }
}

function display_error(error_msg) {
  /**
   * display_error - display error message in the erro span
   *
   * @error_msg : String message to be displayd
   * return: undefined
   */
  err.style.display = "block";
  err.innerText = error_msg;
}
