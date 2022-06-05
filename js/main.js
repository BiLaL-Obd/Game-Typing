const easyLvl = [
  "Hello",
  "World",
  "Python",
  "Input",
  "Copy",
  "Paste",
  "Cut",
  "Car",
  "Cat",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
];
const normalLvl = [
  "Hello",
  "World",
  "Python",
  "Input",
  "Copy",
  "Paste",
  "Cut",
  "Car",
  "Cat",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
];
const hardLvl = [
  "Hello",
  "World",
  "Python",
  "Input",
  "Copy",
  "Paste",
  "Cut",
  "Car",
  "Cat",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
  "Scissor",
  "Home",
  "Setting",
  "Developer",
  "Web",
  "Programming",
  "Python",
  "Input",
  "Copy",
  "Paste",
  "Cut",
  "Programming",
  "Python",
  "Input",
];

const lvl = {
  Easy: {
    arr: easyLvl,
    timer: 5,
  },
  Normal: {
    arr: normalLvl,
    timer: 4,
  },
  Hard: {
    arr: hardLvl,
    timer: 3,
  },
};
// ###################################
let chooseLvl = document.querySelector("select");
chooseLvl.onchange = function () {
  let x = chooseLvl.value;
  localStorage.setItem("level", x);
  window.location.reload();
};
let mainLvl = localStorage.getItem("level");
// ###################################

let lvlName = mainLvl;
let lvlSeconds = lvl[lvlName].timer;
let lvlArr = lvl[lvlName].arr;

let spanLvl = document.querySelector(".info .lvl");
let spanSecond = document.querySelector(".info .seconds");
let start = document.querySelector(".start");
let shoWord = document.querySelector(".show-word");
let input = document.querySelector(".input");
let upcoming = document.querySelector(".upcoming-word");
let time = document.querySelector(".control .sec");
let secondLeft = document.querySelector(".control .score");
let score = document.querySelector(".control .score");
let length = document.querySelector(".control .length");
let finish = document.querySelector(".finish");

spanLvl.innerHTML = lvlName;
spanSecond.innerHTML = lvlSeconds;
time.innerHTML = lvlSeconds;
length.innerHTML = lvlArr.length;

input.onpaste = function () {
  return false;
};

start.onclick = function () {
  this.remove();
  input.focus();

  generateWords();
};

function generateWords() {
  let randomWord = lvlArr[Math.floor(Math.random() * lvlArr.length)];

  shoWord.innerHTML = randomWord;
  let wordIndex = lvlArr.indexOf(randomWord);
  lvlArr.splice(wordIndex, 1);
  upcoming.innerHTML = "";

  for (let i = 0; i < lvlArr.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(lvlArr[i]);
    div.appendChild(txt);
    upcoming.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  time.innerHTML = lvlSeconds;
  let start = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML === "0") {
      clearInterval(start);

      if (input.value.toLowerCase() === shoWord.innerHTML.toLowerCase()) {
        input.value = "";
        score.innerHTML++;

        if (lvlArr.length > 0) {
          generateWords();
        } else {
          gongratz();
          upcoming.remove();
          shoWord.remove();
        }
      } else {
        gameOver();
        upcoming.remove();
      }
    }
  }, 1000);
}

function gongratz() {
  if (score.innerHTML === length.innerHTML) {
    let div = document.createElement("div");
    div.className = "good";
    let txt = document.createTextNode("Gongratz");
    div.appendChild(txt);
    finish.appendChild(div);
  }
}

function gameOver() {
  let div = document.createElement("div");
  div.className = "bad";
  let txt = document.createTextNode("Game Over");
  div.appendChild(txt);
  finish.appendChild(div);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("restart")) {
    window.location.reload();
    localStorage.clear();
  }
});
