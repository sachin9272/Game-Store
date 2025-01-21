const colorDisplay = document.getElementById('colorDisplay');
const buttonContainer = document.getElementById('buttonContainer');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let correctColor;

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function setupGame() {
    // Clear previous buttons and message
    buttonContainer.innerHTML = '';
    message.textContent = '';

    // Generate colors and pick the correct one
    const colors = Array.from({ length: 6 }, generateRandomColor);
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorDisplay.textContent = correctColor;

    // Create buttons for each color
    colors.forEach(color => {
        const button = document.createElement('button');
        button.classList.add('color-button');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => checkAnswer(color));
        buttonContainer.appendChild(button);
    });
}

function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        message.textContent = 'Correct! You guessed the right color!';
        message.style.color = 'green';
        document.querySelectorAll('.color-button').forEach(button => {
            button.style.backgroundColor = correctColor;
        });
    } else {
        message.textContent = 'Wrong! Try again!';
        message.style.color = 'red';
    }
}

resetButton.addEventListener('click', setupGame);

// Initialize the game
setupGame();
