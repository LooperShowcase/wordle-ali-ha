const wordsDiv = document.getElementById("words");
const NUMBER_OF_TRIES = 6;
const NUMBER_OF_CHARS = 5;

for (let i = 0; i < NUMBER_OF_TRIES; i++) {
  let attempt = document.createElement("div");
  attempt.className = "word";
  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let CAR = document.createElement("div");
    CAR.className = "char";
    attempt.appendChild(CAR);
  }
  wordsDiv.appendChild(attempt);
}
let currentChar = 0;
let currentword = 0;
document.addEventListener("keydown", async (event) => {
  const currentAttempt = wordsDiv.children[currentword];
  if (event.key === "Enter") {
    if (currentChar == NUMBER_OF_CHARS) {
      let usergant = getCurrentword();
      let result = await guess(usergant);
      for (let i = 0; i < result.length; i++) {
        currentAttempt.children[i].style.background = result[i];
        await animateCSS(currentAttempt.children[i], "flipInY");
      }

      currentChar = 0;
      currentword++;
    } else {
      alert("not enogh Letters");
    }
  } else if (event.key == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      currentAttempt.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < NUMBER_OF_CHARS) {
    if (event.key.charCodeAt() >= 97 && event.key.charCodeAt() <= 122) {
      currentAttempt.children[currentChar].innerHTML = event.key;
      currentChar++;
    }
  }
});

const getCurrentword = () => {
  let word = "";
  const wordDiv = wordsDiv.children[currentword];
  for (let i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
};

const guess = async (word) => {
  const request = await fetch("/batata/" + word);
  const result = await request.json();
  return result;
};

function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}
