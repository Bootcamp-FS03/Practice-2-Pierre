let currentPlayer = 1;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function startGame() {
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;

  if (player1Name && player2Name) {
    document.getElementById('player1').disabled = true;
    document.getElementById('player2').disabled = true;

    initializeBoard();
    displayBoard();
    resetMessage();

    console.log('Game started!');
  } else {
    alert('Please enter names for both players.');
  }
}

function initializeBoard() {
  const table = document.getElementById('board');
  for (let i = 0; i < 3; i++) {
    const row = table.insertRow(i);
    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell(j);
      cell.addEventListener('click', () => makeMove(i, j));
    }
  }
}

function displayBoard() {
  const table = document.getElementById('board');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      table.rows[i].cells[j].innerText = board[i][j];
    }
  }
}

function makeMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer === 1 ? 'X' : 'O';
    displayBoard();
    if (checkWinner()) {
      showMessage(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (isBoardFull()) {
      resetMessage();
      resetGame();
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }
}

function checkWinner() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== '' &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== '' &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }

  if (
    board[0][2] !== '' &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }

  return false;
}

function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = message;
}

function resetMessage() {
  const messageElement = document.getElementById('message');
  messageElement.innerText = '';
}

function resetGame() {
  currentPlayer = 1;
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  // Clear the table
  const table = document.getElementById('board');
  table.innerHTML = '';

  // Reinitialize the board
  initializeBoard();
  displayBoard();
}
