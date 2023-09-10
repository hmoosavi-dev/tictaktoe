let endOfGame = false;
const gameboard = (() => {
  let board = [
    '',
    ' ',
    '  ',
    '   ',
    '    ',
    '     ',
    '      ',
    '       ',
    '        ',
  ];
  function render(board) {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = board[i];
    }
    gameFlow.findWinner(gameboard);
  }
  function resetGame() {
    let whiteSpace = ' ';
    while (board.length !== 0) {
      board.pop();
    }
    while (board.length !== 9) {
      whiteSpace += ' ';
      board.push(whiteSpace);
    }
    render(board);
    endOfGame = false;
  }

  return {
    board,
    render,
    resetGame,
  };
})();
const gameFlow = (() => {
  let rollIndex = 0;
  function findWinner(gameboard) {
    //logic to determine the winner
    if (
      gameboard.board[0] === gameboard.board[1] &&
      gameboard.board[1] === gameboard.board[2]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[3] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[5]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[6] === gameboard.board[7] &&
      gameboard.board[7] === gameboard.board[8]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[0] === gameboard.board[3] &&
      gameboard.board[3] === gameboard.board[6]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[1] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[7]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[2] === gameboard.board[5] &&
      gameboard.board[5] === gameboard.board[8]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[0] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[8]
    ) {
      endOfGame = true;
    }
    if (
      gameboard.board[2] === gameboard.board[4] &&
      gameboard.board[4] === gameboard.board[6]
    ) {
      endOfGame = true;
    }
    if (endOfGame === true && playerOne.timesPlayed > playerTwo.timesPlayed) {
      alert('Player One Wins');
      playerOne.isWinner = true;
    } else if (
      endOfGame === true &&
      playerTwo.timesPlayed === playerOne.timesPlayed
    ) {
      alert('Player Two Wins');
      playerTwo.isWinner = true;
    }
  }
  return {
    rollIndex,
    findWinner,
  };
})();

function playerFactory(name, mark) {
  return {
    name,
    mark,
    timesPlayed: 0,
    isWinner: false,
  };
}
const playerOne = playerFactory('ali', 'X');
const playerTwo = playerFactory('mamad', 'O');

let resetButton = document.querySelector('.btn-reset');
resetButton.addEventListener('click', gameboard.resetGame);

function cellClick(event) {
  if (endOfGame === true) {
    return;
    // freeze the game if one player wins
  }
  let cellIndex = event.target.classList[1].slice(1);
  if (
    gameboard.board[cellIndex] === 'O' ||
    gameboard.board[cellIndex] === 'X'
  ) {
    //prevent from changing the played marks
    return;
  }
  if (gameFlow.rollIndex % 2 === 0) {
    //whose turn is it?!
    gameboard.board[cellIndex] = playerOne.mark;
    playerOne.timesPlayed++;
  } else {
    gameboard.board[cellIndex] = playerTwo.mark;
    playerTwo.timesPlayed++;
  }
  gameFlow.rollIndex++;
  // gameboard.run();
  gameboard.render(gameboard.board);
}

let cells = document.querySelectorAll('.cell');
cells.forEach((cell) =>
  cell.addEventListener('click', (event) => {
    cellClick(event);
  })
);
