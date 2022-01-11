let randomNumber;
let wordToGuess = pickWord();
let countLetters = 0;
let lives = 10;
let textToGuess = [];

function startGame() {
  document.getElementById('start').disabled = true;
  document.getElementById('hide').style.display = 'block';
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
  randomNumber = Math.floor(Math.random() * wordList.length);
  let wordToGuess = wordList[randomNumber];
  return wordToGuess;
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
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',' q','r','s','t','u','v','w','x','y','z'];
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
      setLife();
    }
}

function getHint() {
  const hintList = ['hint1', 'hint2', 'hint3', 'hint4', 'hint5'];
  alert(hintList[randomNumber]);
}

function restart() {
  location.reload();
}
