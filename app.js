let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let gameOver = false;

// Function to render the game board
function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        document.getElementById(`cell-${i}`).innerText = board[i];
    }
    document.getElementById('turn').innerText = `Turn: ${turn}`;
}

// Function to handle cell click
// Function to handle cell click
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (board[cellIndex] !== '') return;
    
    board[cellIndex] = turn;
    // Set the cell's innerText
    event.target.innerText = turn;
    // Add the class based on the current turn
    event.target.classList.add(turn.toLowerCase());

    // Switch turns
    turn = turn === 'X' ? 'O' : 'X';
    renderBoard();
    checkWinner();
}


// Function to check for a winner
// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let combination of winningCombinations) {
        if (board[combination[0]] === board[combination[1]] &&
            board[combination[1]] === board[combination[2]] &&
            board[combination[0]] !== '') {
            gameOver = true;
            document.getElementById('turn').innerText = `Winner: ${board[combination[0]]}`;
            // Highlight the winning cells
            for (let index of combination) {
                document.getElementById(`cell-${index}`).classList.add('highlight');
            }
            return;
        }
    }
    
    // Check for a draw
    if (!board.includes('')) {
        gameOver = true;
        document.getElementById('turn').innerText = 'It\'s a draw!';
    }
}

// Add event listeners to cells
for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Add event listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    gameOver = false;
    renderBoard();

    // Remove highlight from all cells
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).classList.remove('highlight');
    }
});
