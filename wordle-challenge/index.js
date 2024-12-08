//index.js

// Define the target number
const target = "12345"; // Change this to randomize the target
const maxGuesses = 6;
let attempts = 0;

// Get references to HTML elements
const gameBoard = document.getElementById('game-board');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');

// Initialize the game board
function initializeBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-attempt', i);
            cell.setAttribute('data-index', j);
            gameBoard.appendChild(cell);
        }
    }
}

// Process the guess
function processGuess(guess) {
    if (guess.length !== 5) {
        feedback.textContent = "Please enter exactly 5 digits.";
        return;
    }
    if (!/^\d+$/.test(guess)) {
        feedback.textContent = "Only numeric digits are allowed.";
        return;
    }
    if (attempts >= maxGuesses) {
        feedback.textContent = "No more attempts left!";
        return;
    }

    feedback.textContent = '';
    const currentAttempt = document.querySelectorAll(`[data-attempt='${attempts}']`);
    const usedIndices = new Set();
    const feedbackArray = Array(5).fill('grey');

    // First pass: Check for green
    for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
            feedbackArray[i] = 'green';
            usedIndices.add(i);
        }
    }

    // Second pass: Check for yellow
    for (let i = 0; i < 5; i++) {
        if (feedbackArray[i] !== 'green') {
            for (let j = 0; j < 5; j++) {
                if (!usedIndices.has(j) && guess[i] === target[j]) {
                    feedbackArray[i] = 'yellow';
                    usedIndices.add(j);
                    break;
                }
            }
        }
    }

    // Update the UI
    for (let i = 0; i < 5; i++) {
        currentAttempt[i].textContent = guess[i];
        currentAttempt[i].classList.add(feedbackArray[i]);
    }

    attempts++;
    if (guess === target) {
        feedback.textContent = "Congratulations! You guessed it!";
        guessInput.disabled = true;
        submitBtn.disabled = true;
    } else if (attempts === maxGuesses) {
        feedback.textContent = `Game Over! The correct number was ${target}.`;
    }
}

// Event listeners
submitBtn.addEventListener('click', () => {
    const guess = guessInput.value;
    processGuess(guess);
    guessInput.value = '';
});

// Initialize the board on page load
initializeBoard();
