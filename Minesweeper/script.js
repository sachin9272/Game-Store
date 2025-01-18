const boardSize = 10; 
const mineCount = 15; 
const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
let cells = [];

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    board.innerHTML = '';
    cells = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
        cells.push(cell);
    }
}

function placeMines() {
    let placedMines = 0;
    while (placedMines < mineCount) {
        const index = Math.floor(Math.random() * cells.length);
        if (!cells[index].classList.contains('mine')) {
            cells[index].classList.add('mine');
            placedMines++;
        }
    }
}

function calculateNumbers() {
    const directions = [
        -1, 1, -boardSize, boardSize, -boardSize - 1, -boardSize + 1, boardSize - 1, boardSize + 1
    ];

    cells.forEach((cell, index) => {
        if (!cell.classList.contains('mine')) {
            let mineCount = 0;
            directions.forEach(dir => {
                const neighborIndex = index + dir;
                if (
                    neighborIndex >= 0 &&
                    neighborIndex < cells.length &&
                    Math.floor(neighborIndex / boardSize) === Math.floor((index + dir) / boardSize) &&
                    cells[neighborIndex].classList.contains('mine')
                ) {
                    mineCount++;
                }
            });
            if (mineCount > 0) {
                cell.dataset.number = mineCount;
            }
        }
    });
}

function revealCell(cell) {
    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;
    cell.classList.add('revealed');

    if (cell.classList.contains('mine')) {
        cell.textContent = '💣';
        alert('Game Over!');
        resetGame();
    } else if (cell.dataset.number) {
        cell.textContent = cell.dataset.number;
    } else {
        revealAdjacentCells(cell);
    }
}

function revealAdjacentCells(cell) {
    const index = parseInt(cell.dataset.index);
    const directions = [
        -1, 1, -boardSize, boardSize, -boardSize - 1, -boardSize + 1, boardSize - 1, boardSize + 1
    ];

    directions.forEach(dir => {
        const neighborIndex = index + dir;
        if (
            neighborIndex >= 0 &&
            neighborIndex < cells.length &&
            Math.floor(neighborIndex / boardSize) === Math.floor((index + dir) / boardSize)
        ) {
            const neighbor = cells[neighborIndex];
            if (!neighbor.classList.contains('revealed')) {
                revealCell(neighbor);
            }
        }
    });
}

function toggleFlag(cell) {
    if (cell.classList.contains('revealed')) return;
    cell.classList.toggle('flag');
    cell.textContent = cell.classList.contains('flag') ? '🚩' : '';
}

function resetGame() {
    createBoard();
    placeMines();
    calculateNumbers();

    cells.forEach(cell => {
        cell.addEventListener('click', () => revealCell(cell));
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleFlag(cell);
        });
    });
}

resetButton.addEventListener('click', resetGame);

resetGame();