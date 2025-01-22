
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const startButton = document.getElementById('startButton');

let score = 0;
let timeRemaining = 10;
let timerInterval;

function startGame() {
    score = 0;
    timeRemaining = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
    clickButton.disabled = false;
    startButton.disabled = true;

    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;

        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    clickButton.disabled = true;
    startButton.disabled = false;
    timerDisplay.textContent = 'Game Over!';
}

clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
});

startButton.addEventListener('click', startGame);