document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  let currentPlayer = 'X';
  const cells = Array.from({ length: 9 });

  cells.forEach((square, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
  });

  function handleCellClick(index) {
    //revisamos si la casilla esta completa o si el juego ha terminado
    if (cells[index]) {
      return;
    }

    cells[index] = currentPlayer;
    console.log(cells);
    displayBoard();
  }

  function displayBoard() {
    cells.forEach((value, index) => {
      const cell = board.children[index];
      cell.textContent = value;
    });
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      //Reviso si la cell[a] tiene valor y se compara con el valor de b y c
      return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
  }
});

/*TODO
// 1. SHOW A 3X3 TABLE ON THE UI [x]
// 2. ADD THE ABILITY TO INSERT PLAYER 1 NAME AND PLAYER 2 NAME [ ]
// 3. ADD THE ABILITY TO START A GAME
// 4. ADD THE ABILITY TO MAKE A MOVEMENT AND ALTERNATE PLAYERS IN TURNS
// 5. ONCE THE GAME FINISH SHOW A MESSAGE ON THE CONSOLE WITH THE NAME OF THE WINNER OR IF IT IS A TIE */
