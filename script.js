let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const newGameButton = document.getElementById('new-game-button');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);
newGameButton.addEventListener('click', newGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id.split('-')[1]);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Winner is ${currentPlayer === 'X' ? 'O' : 'X'}!`;
        gameActive = false;
        newGameButton.classList.remove('hidden');
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'Game ended in a draw!';
        gameActive = false;
        newGameButton.classList.remove('hidden');
        return;
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    messageElement.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
    newGameButton.classList.add('hidden');
}

function newGame() {
    resetBoard();
    messageElement.textContent = '';
    gameActive = true;
}
