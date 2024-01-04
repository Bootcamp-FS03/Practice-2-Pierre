const board = document.getElementById('board');
const boardScore = document.getElementById('score-board');
const playerOneNameInput = document.getElementById('playerOneName');
const playerTwoNameInput = document.getElementById('playerTwoName');
const playerOneScoreElement = document.getElementById('playerOneScore');
const playerTwoScoreElement = document.getElementById('playerTwoScore');
const currentPlayerTurnElement = document.getElementById('currentPlayerTurn');
const middleScoreElement = document.getElementById('middleScore');
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
}

function renderBoard() {
  board.innerHTML = '';
  board.style.display = 'grid';
  boardScore.style.display = 'flex';
  playerOneScoreElement.textContent = playerOneNameInput.value.toUpperCase();
  playerTwoScoreElement.textContent = playerTwoNameInput.value.toUpperCase();
  board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
  currentPlayerTurnElement.textContent = `Current Turn: ${
    currentPlayer === 'X' ? playerOneNameInput.value : playerTwoNameInput.value
  }`;

  gameBoard.forEach((value, index) => {
    const cell = createCell(value, index);
    board.appendChild(cell);
  });
}

function createCell(value, index) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.textContent = value;
  cell.addEventListener('click', () => cellClick(index));
  return cell;
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
      gameBoard[start] === 'X'
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
  playerOneScoreElement.textContent = playerOneNameInput.value.toUpperCase();
  playerTwoScoreElement.textContent = playerTwoNameInput.value.toUpperCase();
  middleScoreElement.textContent = `${playerOneScore}:${playerTwoScore}`;
}

function validateNames() {
  return (
    playerOneNameInput.value.trim() !== '' &&
    playerTwoNameInput.value.trim() !== ''
  );
}
