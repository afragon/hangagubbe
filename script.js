'use strict';

const dictonary = [
  'sjöjungfru',
  'walla',
  'afra',
  'noubarzadeh',
  'falafel',
  'corona',
  'hängväxt',
  'fantastisk',
  'polotröja',
];

const guessBar = document.getElementById('submitWord');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');
const currentLife = document.querySelector('.life');
const theWordEL = document.querySelector('.theWord');
const WrongWordsdEL = document.querySelector('.wrongWords');
const infoEl = document.querySelector('.info');
const ownWordEl = document.getElementById('decide');

let decideWord, theWord, arrTheWord, secretWord, guess, life, points;

let chosenWords = ['⛔️'];

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
const calcChallenge = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    secretWord.push('_');
  }
};

const displayWord = function (message) {
  theWordEL.textContent = message;
};

const displayWrongWord = function (message) {
  WrongWordsdEL.textContent = message;
};

const displayLife = function (points) {
  currentLife.src = `${points}.png`;
};

const displayInfo = function (message) {
  infoEl.textContent = message;
};

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

const init = function () {
  life = 10;
  points = 0;
  decideWord = Math.trunc(Math.random() * dictonary.length);
  theWord = dictonary[decideWord];
  arrTheWord = [...theWord];
  secretWord = [];
  calcChallenge(arrTheWord);
  displayWord(secretWord.join(' '));
  displayLife(life);
  console.log(theWord);
};

ownWordEl.addEventListener('click', function () {
  theWord = prompt('wooord?');
  arrTheWord = [...theWord];
  secretWord = [];
  calcChallenge(arrTheWord);
  displayWord(secretWord.join(' '));
  displayLife(life);
});

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
init();

submitBtn.addEventListener('click', function () {
  guess = guessBar.value.toLowerCase();
  console.log(guess);
  test2(arrTheWord, guess);
});

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
let test2 = function (arr, guess) {
  //////////// GUESS RIGHT /////////////
  if (arr.includes(guess)) {
    const indices = [];
    let idx = arr.indexOf(guess);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(guess, idx + 1);
    }
    for (let i = 0; i < indices.length; i++) {
      secretWord[indices[i]] = guess;
    }
    displayWord(secretWord.join(' '));

    //////////// WINNING /////////////
    if (secretWord.join('') == theWord) {
      displayWord(`Ordet är "${theWord}"!`);
    }

    //////////// GUESS WRONG /////////////
  } else if (!arrTheWord.includes(guess) && life > 0) {
    if (!chosenWords.includes(guess)) {
      life--;
      chosenWords.push(guess);
      displayWrongWord(chosenWords.join(' '));
      displayLife(life);
    } else if (chosenWords.includes(guess)) {
      displayInfo('Redan taget!');
    } else {
      life--;
      displayLife(life);
    }

    //////////// LOSING /////////////
  } else if (!arrTheWord.includes(guess) && life == 0) {
    displayWord(`Ordet är "${theWord}"!`);
    currentLife.src = `gameover.png`;
  }
};

resetBtn.addEventListener('click', init);

