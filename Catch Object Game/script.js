const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

//  variables
let basketX = canvas.width / 2 - 40;
const basketWidth = 80;
const basketHeight = 20;
const basketSpeed = 7;

const fallingObjects = [];
const objectRadius = 10;
const objectFallSpeed = 3;

let score = 0;
let isGameOver = false;

// Event listener for basket movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && basketX > 0) {
        basketX -= basketSpeed;
    } else if (event.key === 'ArrowRight' && basketX < canvas.width - basketWidth) {
        basketX += basketSpeed;
    }
});

// Function to create falling objects
function createFallingObject() {
    const x = Math.random() * (canvas.width - objectRadius * 2) + objectRadius;
    fallingObjects.push({ x, y: 0 });
}

// Function to draw basket
function drawBasket() {
    ctx.fillStyle = '#ff4500';
    ctx.fillRect(basketX, canvas.height - basketHeight - 10, basketWidth, basketHeight);
}

// Function to draw falling objects
function drawFallingObjects() {
    ctx.fillStyle = '#32cd32';
    fallingObjects.forEach((object) => {
        ctx.beginPath();
        ctx.arc(object.x, object.y, objectRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
}

// Function to update object positions
function updateFallingObjects() {
    fallingObjects.forEach((object, index) => {
        object.y += objectFallSpeed;

        // Check for collision with basket
        if (
            object.y + objectRadius > canvas.height - basketHeight - 10 &&
            object.x > basketX &&
            object.x < basketX + basketWidth
        ) {
            score++;
            fallingObjects.splice(index, 1);
        }

        // Remove objects that fall off the screen
        if (object.y > canvas.height) {
            fallingObjects.splice(index, 1);
            isGameOver = true;
        }
    });
}

// Function to display score
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Game over screen
function displayGameOver() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ff0000';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    restartButton.style.display = 'block';
}

// Restart game
restartButton.addEventListener('click', () => {
    score = 0;
    isGameOver = false;
    fallingObjects.length = 0;
    basketX = canvas.width / 2 - 40;
    restartButton.style.display = 'none';
    gameLoop();
});

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        drawBasket();
        drawFallingObjects();
        updateFallingObjects();
        drawScore();
        requestAnimationFrame(gameLoop);
    } else {
        displayGameOver();
    }
}

// Spawn objects at intervals
setInterval(() => {
    if (!isGameOver) {
        createFallingObject();
    }
}, 1000);

// Start the game loop
gameLoop();
