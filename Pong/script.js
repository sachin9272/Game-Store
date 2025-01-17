// Get the canvas and its context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Game settings
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;

// Create the paddles
const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };

// Create the ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballSize, speed: 5, dx: 5, dy: 5 };

// Draw the paddles and ball
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Move the paddles
function movePaddles() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Prevent paddles from going out of bounds
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + paddleHeight > canvas.height) leftPaddle.y = canvas.height - paddleHeight;
    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + paddleHeight > canvas.height) rightPaddle.y = canvas.height - paddleHeight;
}

// Ball movement and collision with walls and paddles
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
        ball.dx = -ball.dx;
    }

    if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
        ball.dx = -ball.dx;
    }

    // Ball out of bounds (reset ball position)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        ball.dy = 5;
    }
}

// Control the paddles using the arrow keys and W/S for left paddle
function controlPaddles(event) {
    switch(event.key) {
        case "ArrowUp":
            rightPaddle.dy = -10;
            break;
        case "ArrowDown":
            rightPaddle.dy = 10;
            break;
        case "w":
            leftPaddle.dy = -10;
            break;
        case "s":
            leftPaddle.dy = 10;
            break;
    }
}

// Stop paddle movement when the key is released
function stopPaddles(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        rightPaddle.dy = 0;
    }
    if (event.key === "w" || event.key === "s") {
        leftPaddle.dy = 0;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    drawBall(ball.x, ball.y, ball.radius);

    movePaddles();
    moveBall();

    requestAnimationFrame(gameLoop);
}

// Event listeners for controls
window.addEventListener("keydown", controlPaddles);
window.addEventListener("keyup", stopPaddles);

// Start the game
gameLoop();
