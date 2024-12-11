// Reference to the board container
const board = document.getElementById('board');
// Collection of all cells in the grid
const cells = document.querySelectorAll('.cell');
// Reference to the status message element
const status = document.getElementById('status');
// Reference to the reset button
const resetButton = document.getElementById('reset');

// Variables to track the game state
let currentPlayer = 'X'; // Tracks the current player ('X' or 'O')
let gameActive = true;   // Tracks if the game is ongoing
let gameState = Array(9).fill(null); // Represents the state of the board

// Winning combinations: indices of cells that form a winning line
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

// Handles clicks on a cell
function handleCellClick(event) {
    const cell = event.target; // The clicked cell
    const index = cell.getAttribute('data-index'); // Index of the cell

    // Ignore clicks if the cell is already taken or the game is over
    if (gameState[index] !== null || !gameActive) {
        return;
    }

    // Update the state and UI for the clicked cell
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    // Check for a win
    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}\'s turn`;
}

// Checks if the current player has won
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination; // Destructure indices
        // Check if all cells in the combination match the current player
        return gameState[a] === currentPlayer && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Checks if the game is a draw
function checkDraw() {
    // The game is a draw if all cells are filled and no winner
    return gameState.every(cell => cell !== null);
}

// Resets the game to its initial state
function resetGame() {
    currentPlayer = 'X'; // Reset to player X
    gameActive = true;  // Set the game as active
    gameState = Array(9).fill(null); // Clear the board state

    // Clear the UI for all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });

    // Reset the status message
    status.textContent = `Player ${currentPlayer}\'s turn`;
}

// Add event listeners to all cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);