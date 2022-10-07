let password = document.getElementById("password");
let generateButton = document.getElementById("generate");
let copyButton = document.getElementById("copy");
let copiedMessage = document.querySelector(".copied-message");
let allCheckBoxes = document.querySelectorAll("input[type = 'checkbox']");
let box1 = document.getElementById("_1");
let box2 = document.getElementById("_2");
let box3 = document.getElementById("_3");

let smallletters = "abcdefghijklmnopqrstuvwxyz";
let capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let specialCharacters = "!@#$%^&*()_-[]{}";
let numbers = "1234567890";

let random = "";

let chosenCategory = "";

generateButton.onclick = () => {
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

copyButton.onclick = () => {
    navigator.clipboard.writeText(password.value)
    copiedMessage.classList.add("show-message")
    let messageTIme = setInterval(() => {
        copiedMessage.classList.remove("show-message")
        clearInterval(messageTIme)
    }, 500) 
}