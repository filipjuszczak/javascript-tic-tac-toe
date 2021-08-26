'use strict';

const game = function () {
  const tiles = document.querySelectorAll('.tile');
  const move = document.querySelector('.move');
  const cover = document.querySelector('.cover');
  const winnerHeading = document.querySelector('.winner-text');
  const winnerText = document.querySelector('.winner');

  const symbols = ['O', 'X'];
  let currentSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const fontAwesomeSymbols = [
    '<i class="far fa-circle"></i>',
    '<i class="fas fa-times"></i>',
  ];

  let performedMoves = Array(9).fill(null);
  const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;

  const updateMoveText = function () {
    currentSymbol === 'O'
      ? (move.style.color = 'rgb(140, 199, 255)')
      : (move.style.color = 'rgb(255, 84, 84)');
    move.innerHTML = currentSymbol;
  };

  updateMoveText();

  const checkWin = function () {
    for (let i = 0; i < winningPossibilities.length; i++) {
      const [a, b, c] = winningPossibilities[i];

      if (
        performedMoves[a] &&
        performedMoves[a] === performedMoves[b] &&
        performedMoves[a] === performedMoves[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const resetGame = function () {
    cover.classList.remove('active');
    winnerHeading.classList.remove('active');
    winnerText.innerHTML = '';
    currentSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    performedMoves = Array(9).fill(null);
    winner = null;

    tiles.forEach(tile => (tile.querySelector('.symbol').innerHTML = ''));
    updateMoveText();
  };

  const showWinner = function () {
    cover.classList.add('active');
    winnerHeading.classList.add('active');
    winnerHeading.innerHTML = winner;

    setTimeout(resetGame, 3000);
  };

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (performedMoves[tile.id] === null) {
        const tileSpan = tile.querySelector('.symbol');

        if (currentSymbol === 'O') {
          tileSpan.innerHTML = fontAwesomeSymbols[0];
          performedMoves[tile.id] = 'O';

          if (checkWin()) {
            winner = `Winner: ${currentSymbol}`;
            showWinner();
          } else {
            currentSymbol = symbols[1];
            updateMoveText();
          }
        } else {
          tileSpan.innerHTML = fontAwesomeSymbols[1];
          performedMoves[tile.id] = 'X';

          if (checkWin()) {
            winner = `Winner: ${currentSymbol}`;
            showWinner();
          } else {
            currentSymbol = symbols[0];
            updateMoveText();
          }
        }

        if (performedMoves.every(move => move != null) && !winner) {
          winner = 'Draw!';
          showWinner(winner);
        }
      }
    });
  });
};

game();
