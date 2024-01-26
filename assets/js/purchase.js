// select inputs
const sub = document.getElementById("sub");
const numInput = document.getElementById("card-number");
const cardIcon = document.getElementById("cardIcon");
const cvv = document.getElementById("cvv");
const err_span = document.getElementById("err_span");
const successDiv = document.getElementById("success");
const ex_date = document.getElementById("expiry-date");
const err_div = document.getElementById("err_div");
const name_err = document.getElementById("err-form-name");
const nameInputerr = document.getElementById("name");

// obj with icons locations
let imagesDict = {
  Visa: "assets/imgs/visaIcon.png",
  MasterCard: "assets/imgs/mastercardIcon.png",
};

// hide divs
successDiv.style.display = "none";
cardIcon.style.display = "none";

function luhn(input) {
  /* check cridet card number if it's valid or not
    @input: cridet card number
    Return: true if valid false otherwise
    */

  // replace not allowed chars and put numbeer into array
  let notAllowed = "-";
  let cridetNumber = input
    .split("")
    .filter((num) => notAllowed.indexOf(num) < 0);

  // console.log(cridetNumber);

  let len = cridetNumber.length;

  // reverse array
  let revCridet = cridetNumber.reverse();

  // get the first nums and other nums
  let firstNums = [];
  let otherNums = [];

  for (let i = 0; i < revCridet.length; i++) {
    if (i % 2 == 0) firstNums.push(Number(revCridet[i]));
    else
      otherNums.push(
        Math.floor((Number(revCridet[i]) * 2) / 10) +
          Number((revCridet[i] * 2) % 10)
      );
  }

  let totalSum = 0;
  // get the sum of numbers
  if (firstNums && otherNums) {
    let firstSum = firstNums.reduce((p, c) => (p += c));
    let otherSum = otherNums.reduce((p, c) => (p += c));
    totalSum = firstSum + otherSum;
  }
  if (totalSum % 10 == 0) {
    return true;
  } else {
    return false;
  }
}

function cardName(cardNum) {
  /**
   * check card number and return it's vendor name
   * @cardNun: cridet Card number
   * Return: Card's vendor name
   */
  let notAllowed = "-";
  let cridetNumber = cardNum
    .split("")
    .filter((num) => notAllowed.indexOf(num) < 0);

  len = cridetNumber.length;

  // check if it's visa card
  if (cridetNumber[0] == 4 && (len == 13 || len == 16)) {
    return "Visa";
  }
  // check if it's Amirecan express card
  // else if (
  //   len == 15 &&
  //   Number(cridetNumber[0]) == 3 &&
  //   (cridetNumber[1] == 4 || cridetNumber[1] == 7)
  // )
  //   return [true, "American Express"];
  // check if it's masterCard
  else if (
    len === 16 &&
    Number(cridetNumber[0]) === 5 &&
    (Number(cridetNumber[1]) === 1 ||
      Number(cridetNumber[1]) === 2 ||
      Number(cridetNumber[1]) === 3 ||
      Number(cridetNumber[1]) === 4 ||
      Number(cridetNumber[1]) === 5)
  ) {
    return "MasterCard";
  } else {
    return "Invalid";
  }
}

sub.addEventListener("click", (e) => {
  e.preventDefault();
  // grab elemnts from  the form
  const number = document.getElementById("card-number").value;
  const ex_date = document.getElementById("expiry-date").value;
  const nameInput = document.getElementById("name");

  // if (!nameInput) {
  //   name_err.style.display = "block";
  //   name_err.style.innerText = "Name is required";
  // }
  // user put valid Card Number
  if (
    luhn(number) &&
    (cardName(number) == "Visa" || cardName(number) == "MasterCard") &&
    validate_date(ex_date) &&
    nameInput
  ) {
    // make the purchase
    closeCheckoutModal();
    clearCart();
    successDiv.innerText = "Successful Purchase, order on your way (:";
    successDiv.style.backgroundColor = "aquamarine";
    successDiv.style.display = "block";
  } else {
    err_div.innerText =
      "CardNumber or expiration date are incorrect please try again";
    err_div.style.color = "red";
    err_div.style.display = "block";
  }
});

// add event lisnter in numinput
numInput.addEventListener("keydown", (e) => {
  // console.log(e);
  // make sure user only put numbers
  if (
    (e.key.charCodeAt(0) < 48 || e.key.charCodeAt(0) > 57) &&
    e.key.charCodeAt(0) != 8 &&
    !e.ctrlKey &&
    e.key.charCodeAt(0) != 9 &&
    e.key != "ArrowLeft" &&
    e.key != "ArrowRight" &&
    e.key != "Backspace"
  ) {
    e.preventDefault();
  }
  err_span.style.display = "none";
  err_div.style.display = "none";
});

numInput.addEventListener("blur", (e) => {
  let number = document.getElementById("card-number").value;
  // if it's a valid input
  console.log(luhn(number));
  if (luhn(number)) {
    // display the corsponding icon
    if (cardName(number) == "Visa") {
      err_span.style.display = "block";
      cardIcon.src = imagesDict["Visa"];
    } else if (cardName(number) == "MasterCard") {
      err_span.style.display = "block";
      cardIcon.src = imagesDict["MasterCard"];
    } else {
      display_error("Sorry, We only accept Visa and MasterCard");
    }
  } else {
    display_error("Please enter valid card Number");
  }
  // display icon beside inline with input field
  cardIcon.style.display = "inline";
});

numInput.addEventListener("input", (e) => {
  err_span.style.display = "none";
  cardIcon.src = "";
});

nameInputerr.addEventListener("input", (e) => {
  err_span.style.display = "none";
});

cvv.addEventListener("keydown", (e) => {
  // make sure user enter only 3 numbers in cvv field
  let input = document.getElementById("cvv").value;
  if (
    (input.length >= 3 ||
      e.key.charCodeAt(0) < 48 ||
      e.key.charCodeAt(0) > 57) &&
    e.key != "Backspace"
  ) {
    e.preventDefault();
  }
});

function display_error(error_msg) {
  /**
   * display_error - display error message in the erro span
   *
   * @error_msg : String message to be displayd
   * return: undefined
   */
  err_span.style.display = "block";
  err_span.innerText = error_msg;
}

function validate_date(date) {
  /**
   * validate_date - validate the date to match MM/YY formula
   * @date : date that the user input
   * Return: ture if the date is valid, false otherwise
   */
  const reqex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return reqex.test(date);
}
