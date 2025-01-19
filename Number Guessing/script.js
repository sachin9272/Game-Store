let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

guessButton.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    attempts++;

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed it right in ${attempts} attempts.`;
        guessButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
    } else {
        message.textContent = 'Too high! Try again.';
    }
});

resetButton.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    message.textContent = '';
    guessButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
});