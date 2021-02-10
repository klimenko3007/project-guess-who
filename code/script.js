// All the DOM selectors stored as short variables
const board = document.getElementById('board');
const questions = document.getElementById('questions');
const restartButton = document.getElementById('restart');
const filterButton = document.getElementById('filter');
const winOrLooseBoard = document.getElementById('winOrLose');
const winOrLooseText = document.getElementById('winOrLoseText');
const playAgainButton = document.getElementById('playAgain');
const round = document.getElementById('rounds-number')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hairColor: 'hidden',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hairColor: 'grey',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hairColor: 'black',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hairColor: 'purple',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: true,
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hairColor: 'brown',
    eyeColor: 'blue',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hairColor: 'white',
    eyeColor: 'hidden',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hairColor: 'black',
    eyeColor: 'blue',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hairColor: 'grey',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hairColor: 'black',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: true,
    smoker: false,
  },
];

// Global variables
let secret;
let currentQuestion;
let charactersInPlay;
let roundNumber = 0;

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function starts (and restarts) the game
const start = () => {
  //updateRoundTracker(0);
  roundNumber = 0;
  charactersInPlay = CHARACTERS;
  generateBoard();
  setSecret();
}

//This function creates an object currentQuestion from a drop down selector
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label;
  const valueOfTheQuestion = questions.value;
  if (category === 'hair color') {
    currentQuestion = {
      attribute: 'hairColor',
      value: valueOfTheQuestion,
      category: category,
    }
  } else if (category === 'eye color') {
    currentQuestion = {
      attribute: 'eyeColor',
      value: valueOfTheQuestion,
      category: category,
    }
  } else if (category === 'accessories') {
    currentQuestion = {
      attribute: valueOfTheQuestion,
      value: true,
      category: category,
    }
  } else if (category === 'other') {
    currentQuestion = {
      attribute: valueOfTheQuestion,
      value: true,
      category: category,
    }
  }
  return currentQuestion;
}
//  This function compares properties' values of secret object and currentQuestion object. 
//It is invoked when player clicks on 'Find Out' button.
const checkQuestion = () => {
  roundNumber ++;
  round.innerText = `${roundNumber}`;
  const secretValue = secret[currentQuestion.attribute];
  if (secretValue === currentQuestion.value) {
    filterCharacters(true, currentQuestion.category)
  } else {
    filterCharacters(false, currentQuestion.category)
  }
}
//This function filters the characters based on the value of their choice.
//It also alerts the player of whether their choice was right/wrong
const filterCharacters = (keep, group) => {
  if (group === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${currentQuestion.attribute}! Keep all that wears ${currentQuestion.attribute}!`
      );
    } else {
      alert(
        `No, the person doesn't wear ${currentQuestion.attribute}! Remove all that wears ${currentQuestion.attribute}!`
      );
    }
  } else if (group === 'hair color') {
    if (keep) {
      alert(
        `Yes, the person has ${currentQuestion.value} hair! Keep all that have ${currentQuestion.value} hair!`
      );
    } else {
      alert(
        `No, the person does not have ${currentQuestion.value} hair! Remove all that have ${currentQuestion.value} hair!`
      );
    }
  } else if (group === 'other') {
    if (keep) {
      alert(
        `Yes, the person is a ${currentQuestion.attribute}! Keep all that are ${currentQuestion.attribute}s!`
      );
    } else {
      alert(
        `No, the person is not a ${currentQuestion.attribute}! Remove all that are not ${currentQuestion.attribute}s!`
      );
    }
  } else {
    if (keep) {
      alert(
        `"Yes, the person has ${currentQuestion.value} eyes! Keep all persons with ${currentQuestion.value} eyes"`
      );
    } else {
      alert(
        `No, the person doesnt have ${currentQuestion.value} eyes! Remove all persons with ${currentQuestion.value} eyes"`
      )
    }
  }
  if (keep) {
    charactersInPlay = charactersInPlay.filter(person => person[currentQuestion.attribute] === currentQuestion.value)
  } else { charactersInPlay = charactersInPlay.filter(person => person[currentQuestion.attribute] !== currentQuestion.value) }
  generateBoard()
}


//Guess function allows the player to check the guess and secret person
const guess = (suspect) => {
  console.log(suspect);
  const userGuess = suspect;
  if (confirm(`Are you sure you want to try ${userGuess}?`)) {
    checkMyGuess(userGuess);
  }
}
//This function removes the board and shows win/loose text
const showWinSection = () => {
  winOrLooseBoard.classList.add('shown');
  board.innerHTML = '';
}
//This function invokes showWinSection function and shows the message depending on whether the guess was correct
const checkMyGuess = (userGuess) => {
  showWinSection()
  if (userGuess === secret.name) {
    winOrLooseText.innerText = 
    `Congratulations! It is ${userGuess}! 
    You won in ${roundNumber} rounds!`;
  } else {
    winOrLooseText.innerText = `Sorry, it is not ${userGuess} try again!`
  }
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
questions.addEventListener('change', selectQuestion)
filterButton.addEventListener('click', checkQuestion)
playAgainButton.addEventListener('click', () =>{
  location.reload();
})