document.addEventListener('DOMContentLoaded', () => {
    const size = 4;
    let tiles = Array(size).fill().map(() => Array(size).fill(0));
    let score = 0;

    const drawBoard = () => {
        const board = document.getElementById('board');
        board.innerHTML = '';
        tiles.forEach(row => {
            row.forEach(value => {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                if (value !== 0) {
                    tile.classList.add(`tile-${value}`);
                    tile.dataset.value = value;
                    tile.innerHTML = `<div>${value}</div>`;
                }
                board.appendChild(tile);
            });
        });
        document.getElementById('score').textContent = score;
    };

    const generateTile = () => {
        const emptyTiles = [];
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (tiles[r][c] === 0) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tiles[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const combineTiles = (line) => {
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] !== 0 && line[i] === line[i + 1]) {
                line[i] *= 2;
                score += line[i]; // Update score
                line[i + 1] = 0;
            }
        }
        return line.filter(val => val !== 0);
    };

    const moveTiles = (direction) => {
        let moved = false;
        if (direction === 'up' || direction === 'down') {
            for (let c = 0; c < size; c++) {
                let line = [];
                for (let r = 0; r < size; r++) {
                    line.push(tiles[r][c]);
                }
                if (direction === 'down') line.reverse();
                let newLine = combineTiles(line);
                while (newLine.length < size) newLine.push(0);
                if (direction === 'down') newLine.reverse();
                for (let r = 0; r < size; r++) {
                    if (tiles[r][c] !== newLine[r]) {
                        moved = true;
                        tiles[r][c] = newLine[r];
                    }
                }
            }
        } else if (direction === 'left' || direction === 'right') {
            for (let r = 0; r < size; r++) {
                let line = tiles[r].slice();
                if (direction === 'right') line.reverse();
                let newLine = combineTiles(line);
                while (newLine.length < size) newLine.push(0);
                if (direction === 'right') newLine.reverse();
                if (tiles[r].join() !== newLine.join()) {
                    moved = true;
                    tiles[r] = newLine;
                }
            }
        }
        if (moved) {
            generateTile();
            drawBoard();
            if (isGameOver()) showGameOverPopup();
        }
    };

    const isGameOver = () => {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (tiles[r][c] === 0) return false;
                if (c < size - 1 && tiles[r][c] === tiles[r][c + 1]) return false;
                if (r < size - 1 && tiles[r][c] === tiles[r + 1][c]) return false;
            }
        }
        return true;
    };

    const showGameOverPopup = () => {
        const popup = document.getElementById('game-over-popup');
        popup.querySelector('.popup-content').innerHTML = `
            <h2>Game Over!</h2>
            <p>Your Score: <b>${score}</b></p>
            <button id="restart">Restart</button>
            <a href="../index.html"><button id="exit">Exit</button></a>
        `;
        popup.classList.add('show');
        document.getElementById('restart').addEventListener('click', resetGame);
    };

    const hideGameOverPopup = () => {
        document.getElementById('game-over-popup').classList.remove('show');
    };

    const resetGame = () => {
        tiles = Array(size).fill().map(() => Array(size).fill(0));
        score = 0;
        generateTile();
        generateTile();
        drawBoard();
        hideGameOverPopup();
    };

    document.getElementById('restart').addEventListener('click', resetGame);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') moveTiles('up');
        if (e.key === 'ArrowDown') moveTiles('down');
        if (e.key === 'ArrowLeft') moveTiles('left');
        if (e.key === 'ArrowRight') moveTiles('right');
    });

    resetGame();
});
