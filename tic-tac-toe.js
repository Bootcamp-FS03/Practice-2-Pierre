const board = document.getElementById('board');
const playerOneNameInput = document.getElementById('playerOneName');
const playerTwoNameInput = document.getElementById('playerTwoName');
let playerOneScore = 0;
let playerTwoScore = 0;
let currentPlayer = 'X';
let boardSize = 3;
let gameBoard = [];

function startGame() {
  if (validateNames()) {
    boardSize = parseInt(document.getElementById('boardSize').value, 10);
    initializeBoard();
    renderBoard();
  } else {
    alert('Both player names are required!');
  }
}

function initializeBoard() {
  gameBoard = Array.from({ length: boardSize * boardSize }, () => '');
  console.log(gameBoard);
}

function renderBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;

  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => cellClick(index));
    board.appendChild(cell);
  });
}

function cellClick(index) {
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
    checkWinner();
  }
}

function checkWinner() {
  for (let i = 0; i < boardSize; i++) {
    if (checkLine(i * boardSize, 1)) return;

    if (checkLine(i, boardSize)) return;
  }

  if (checkLine(0, boardSize + 1)) return;
  if (checkLine(boardSize - 1, boardSize - 1)) return;

  if (!gameBoard.includes('')) {
    alert("It's a draw!");
    startGame();
  }
}

function checkLine(start, step) {
  const line = [];
  for (let i = 0; i < boardSize; i++) {
    line.push(gameBoard[start + i * step]);
  }

  if (
    line.every((value) => value === 'X') ||
    line.every((value) => value === 'O')
  ) {
    const winnerName =
      currentPlayer === 'X'
        ? playerOneNameInput.value
        : playerTwoNameInput.value;
    alert(`Player ${winnerName} wins!`);
    updateScores(winnerName);
    startGame();
    return true;
  }

  return false;
}
function updateScores(winnerName) {
  if (winnerName === playerOneNameInput.value) {
    playerOneScore++;
  } else if (winnerName === playerTwoNameInput.value) {
    playerTwoScore++;
  }

  displayScores();
}

function displayScores() {
  const playerOneScoreElement = document.getElementById('playerOneScore');
  const playerTwoScoreElement = document.getElementById('playerTwoScore');
  const middleScoreElement = document.getElementById('middleScore');

  playerOneScoreElement.textContent = `${playerOneNameInput.value}: ${playerOneScore}`;
  playerTwoScoreElement.textContent = `${playerTwoNameInput.value}: ${playerTwoScore}`;
  middleScoreElement.textContent = `${playerOneScore}:${playerTwoScore}`;
}

function validateNames() {
  return (
    playerOneNameInput.value.trim() !== '' &&
    playerTwoNameInput.value.trim() !== ''
  );
}
