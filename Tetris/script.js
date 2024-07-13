document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('board');
    const context = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const scale = 30; // size of each tetris block
    const rows = 20;
    const cols = 10;
    let board = [];
    let currentPiece;
    let score = 0;
    let gameInterval;

    const shapes = [
        // I
        [[1, 1, 1, 1]],
        // J
        [[1, 0, 0], [1, 1, 1]],
        // L
        [[0, 0, 1], [1, 1, 1]],
        // O
        [[1, 1], [1, 1]],
        // S
        [[0, 1, 1], [1, 1, 0]],
        // T
        [[0, 1, 0], [1, 1, 1]],
        // Z
        [[1, 1, 0], [0, 1, 1]]
    ];

    const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

    class Piece {
        constructor(shape) {
            this.shape = shape;
            this.color = colors[shapes.indexOf(shape)];
            this.x = Math.floor(cols / 2) - Math.floor(shape[0].length / 2);
            this.y = 0;
        }

        draw() {
            context.fillStyle = this.color;
            this.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        context.fillRect((this.x + x) * scale, (this.y + y) * scale, scale, scale);
                    }
                });
            });
        }

        move(dir) {
            this.x += dir;
            if (this.collide()) {
                this.x -= dir;
            }
        }

        drop() {
            this.y++;
            if (this.collide()) {
                this.y--;
                this.lock();
                currentPiece = randomPiece();
            }
        }

        rotate() {
            const tempShape = this.shape;
            this.shape = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
            if (this.collide()) {
                this.shape = tempShape;
            }
        }

        collide() {
            for (let y = 0; y < this.shape.length; y++) {
                for (let x = 0; x < this.shape[y].length; x++) {
                    if (this.shape[y][x] &&
                        (board[this.y + y] && board[this.y + y][this.x + x]) !== 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        lock() {
            this.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        board[this.y + y][this.x + x] = this.color;
                    }
                });
            });

            for (let y = board.length - 1; y >= 0; y--) {
                if (board[y].every(value => value !== 0)) {
                    board.splice(y, 1);
                    board.unshift(Array(cols).fill(0));
                    score += 10;
                    scoreElement.textContent = score;
                }
            }

            if (this.y === 0) {
                clearInterval(gameInterval);
                alert("Game Over");
                startButton.disabled = false;
            }
        }
    }

    const randomPiece = () => new Piece(shapes[Math.floor(Math.random() * shapes.length)]);

    const drawBoard = () => {
        context.fillStyle = '#111';
        context.fillRect(0, 0, canvas.width, canvas.height);
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.fillStyle = value;
                    context.fillRect(x * scale, y * scale, scale, scale);
                }
            });
        });
    };

    const resetBoard = () => {
        board = Array.from({ length: rows }, () => Array(cols).fill(0));
    };

    const update = () => {
        currentPiece.drop();
        drawBoard();
        currentPiece.draw();
    };

    startButton.addEventListener('click', () => {
        resetBoard();
        currentPiece = randomPiece();
        score = 0;
        scoreElement.textContent = score;
        startButton.disabled = true;
        gameInterval = setInterval(update, 1000);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            currentPiece.move(-1);
        } else if (event.key === 'ArrowRight') {
            currentPiece.move(1);
        } else if (event.key === 'ArrowDown') {
            currentPiece.drop();
        } else if (event.key === 'ArrowUp') {
            currentPiece.rotate();
        }
    });
});
