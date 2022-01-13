let randomNumber;
let wordToGuess = pickWord();
let countLetters = 0;
let lives = 10;
let textToGuess = [];
let indexFrame = 0;

function startGame() {
  document.getElementById('start').disabled = true;
  document.getElementById('hide').style.display = 'block';
  document.getElementById('hangman').src = './images/0.png';
  let word = document.getElementById('word');
  for (let letterIndex = 0; letterIndex < wordToGuess.length; ++letterIndex) {
    textToGuess[letterIndex] = document.createElement('input');
    textToGuess[letterIndex].className = 'inputLetters';
    textToGuess[letterIndex].placeholder = '_';
    word.appendChild(textToGuess[letterIndex]);
  }
  setLife();
  addKeyboard();
}

function pickWord() {
  const wordList = ['marble','abracadabra','supercalifragilistic','outerworldly','cacamaca'];
  randomNumber = getRandomNumber(wordList);
  let wordToGuess = wordList[randomNumber];
  return wordToGuess;
}

function getRandomNumber(wordList) {
  return Math.floor(Math.random() * wordList.length);
}


function setLife() {
  let life = document.getElementById('life');
  life.className = 'showLives';
  life.innerHTML = `You have ${lives} lives left`;
  if (lives === 0) {
    alert('Game over');
  }
}

function addKeyboard() {
  let alphabet = [];
  for(i = 10; i < 36; ++i){
    alphabet += i.toString(36);
  }
  let keyboard = document.getElementById('keyboard');
  for (let buttonIndex = 0; buttonIndex < alphabet.length; ++buttonIndex) {
      let button = document.createElement('button');
      button.innerHTML = alphabet[buttonIndex];
      button.value = alphabet[buttonIndex];
      button.className = 'keyboardButtons';
      button.onclick = function() {
        button.disabled = true;
        let letter = button.value;
        validateLetter(letter);
      };
      keyboard.appendChild(button);
  }
}

function validateLetter(letter) {
    if (wordToGuess.includes(letter)) {
      for (let letterIndex = 0; letterIndex < wordToGuess.length; ++letterIndex) {
        if (wordToGuess.charAt(letterIndex) === letter) {
          textToGuess[letterIndex].value = letter;
          ++countLetters;
          if (countLetters === wordToGuess.length) {
            alert('You win');
          }
        }
      }
    } else {
      --lives;
      ++indexFrame;
      animation();
      setLife();
    }
}

function animation() {
  let imgPositions = [[10,0],[24,60],[24,60],[24,132],[46,121],[70,132],[73,113],[73,133],[105,133],[105,109],[50,125]];
  let frame = [];
  for (let indexImg = 1; indexImg <= imgPositions[0][0]; ++indexImg) {
    frame[indexImg] = new Image();
    frame[indexImg].src = `./images/${indexImg}.png`;
    if (indexImg === indexFrame) {
      document.getElementById('frames').appendChild(frame[indexImg]);
    }
  }
  placeIt(frame[indexFrame], imgPositions[indexFrame][0], imgPositions[indexFrame][1]);
}

function placeIt(frame, x, y) {
  frame.className = 'frame';
  frame.style.top = x + 'px';
  frame.style.left = y + 'px';
}

function getHint() {
  const hintList = ['hint1', 'hint2', 'hint3', 'hint4', 'hint5'];
  alert(hintList[randomNumber]);
}

function restart() {
  location.reload();
}
