let password = document.getElementById("password");
let generateButton = document.getElementById("generate");
let allCheckBoxes = document.querySelectorAll("input[type = 'checkbox']");
let box1 = document.getElementById("_1");
let box2 = document.getElementById("_2");
let box3 = document.getElementById("_3");

let smallletters = "abcdefghijklmnopqrstuvwxyz";
let capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let specialCharacters = "!@#$%^&*()_-[]{}";
let numbers = "1234567890";

let table = document.querySelector("table");

let clearHistoryButton = document.querySelector(".clear-history");

let passwordsArray;
if (window.localStorage.passwords) {
  clearHistoryButton.style.display = "inline";
  passwordsArray = JSON.parse(window.localStorage.passwords);
  createPassword(passwordsArray);
} else {
  clearHistoryButton.style.display = "none";
  passwordsArray = [];
}

let random = "";

let chosenCategory = "";

generateButton.onclick = () => {
  clearHistoryButton.style.display = "inline";
  let count = 0;
  allCheckBoxes.forEach((box) => {
    if (box.checked === true) {
      count++;
    }
  });
  if (count === 0) {
    chosenCategory = smallletters;
  } else if (count === 1) {
    if (
      box1.checked === true &&
      box2.checked === false &&
      box3.checked === false
    ) {
      chosenCategory = concatPassword(smallletters, capitalLetters);
    } else if (
      box1.checked === false &&
      box2.checked === true &&
      box3.checked === false
    ) {
      chosenCategory = concatPassword(smallletters, specialCharacters);
    } else if (
      box1.checked === false &&
      box2.checked === false &&
      box3.checked === true
    ) {
      chosenCategory = concatPassword(smallletters, numbers);
    }
  } else if (count === 2) {
    if (
      box1.checked === true &&
      box2.checked === true &&
      box3.checked === false
    ) {
      chosenCategory = concatPassword(
        smallletters,
        capitalLetters,
        specialCharacters
      );
    } else if (
      box1.checked === false &&
      box2.checked === true &&
      box3.checked === true
    ) {
      chosenCategory = concatPassword(smallletters, specialCharacters, numbers);
    } else if (
      box1.checked === true &&
      box2.checked === false &&
      box3.checked === true
    ) {
      chosenCategory = concatPassword(smallletters, capitalLetters, numbers);
    }
  } else {
    chosenCategory = concatPassword(
      smallletters,
      capitalLetters,
      specialCharacters,
      numbers
    );
  }

  password.value = "";
  generatePassword(chosenCategory);

  // Create an object
  let passwordObject = {
    password: password.value,
  };

  passwordsArray.push(passwordObject);

  window.localStorage.passwords = JSON.stringify(passwordsArray);

  createPassword(passwordsArray);
};

function generatePassword(category) {
  random = "";
  let randomIndex;
  for (let i = 0; i < 16; i++) {
    randomIndex = Math.trunc(Math.random() * category.length);
    random += category[randomIndex];
  }

  password.value = random;
}

function concatPassword(...categories) {
  return categories.join("");
}

function createPassword(array) {
  table.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td1Text = document.createTextNode(i + 1 + " -");
    let td2 = document.createElement("td");
    let td2Span = document.createElement("span");
    let td2Text = document.createTextNode(array[i].password);
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Copy");
    button.appendChild(buttonText);
    td2Span.appendChild(td2Text);
    td2.appendChild(td2Span);
    td2.appendChild(button);
    td1.appendChild(td1Text);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }

  let buttons = document.querySelectorAll("tr td button");
  buttons.forEach((button) => {
    button.onclick = (e) => {
      buttons.forEach((button) => {
        button.innerHTML = "Copy";
      });
      navigator.clipboard.writeText(e.target.previousElementSibling.innerHTML);
      button.innerHTML = "Copied";
    };
  });
}

clearHistoryButton.onclick = () => {
  passwordsArray = [];
  window.localStorage.clear();
  table.innerHTML = "";
  clearHistoryButton.style.display = "none";
};
