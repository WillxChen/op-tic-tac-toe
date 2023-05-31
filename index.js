/* To-Do
  - Apply game logic to allow players to choose a tile to play on


  Game Flow
  - Randomize who gets to play first - Done
  - Player chooses a tile to play on and game checks if square is already filled
    - if tile is already filled then return error
    - if tile is empty then fill tile in gameBoard with piece
    - update the tile and rerender the gameBoard
  - gameFlow now passes control to the opposing player
*/

const Gameboard = (() => {
  // Gameboard is responsible for storing the game assets and updating the DOM
  const board = ["x", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;

  const addPiece = (index, piece) => {
    if (!board[index]) {
      board[index] = piece;
    }
  };

  return { getBoard, addPiece };
})();

const Player = (name) => {
  // Store player information like wins, losses, and name
  const piece = "";
  return { name, piece };
};

const GameController = (() => {
  // Handles game flow and game events
  const game = Gameboard;
  const board = Gameboard.getBoard();
  let activePlayer = [];
  const winConditions = [
    // Rows
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // Columns
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // Diagonals
    [1, 5, 9],
    [3, 5, 7],
  ];

  const randomizeOrder = (players) => {
    switch (Math.floor(Math.random() * 2) + 1) {
      case 1:
        players[0].piece = "x";
        players[1].piece = "o";
        activePlayer[0] = players[0];
        break;
      case 2:
        players[0].piece = "o";
        players[1].piece = "x";
        activePlayer[0] = players[1];
        break;
    }
  };

  const checkForWin = () => {
    let isWin = false;
    // Loop through the board and check against each condition
    winConditions.forEach((condition) => {
      let combo = [];

      condition.forEach((cell) => {
        combo.push(board[cell - 1]);
      });

      let allMatch = () =>
        combo.every((value) => value === combo[0] && value !== "");

      //Now check if every number matches
      if (combo.length > 0 && allMatch()) {
        isWin = true;
      }
    });
    return isWin;
  };

  const checkForTie = () => {
    if (board.includes("")) {
      return;
    }
    if (!checkForWin()) {
      return true;
    }
  };

  const switchActivePlayer = () => {
    activePlayer[0] = activePlayer[0] === players[0] ? players[1] : players[0];
  };

  const playRound = (index) => {
    const currentPiece = activePlayer[0].piece;
    game.addPiece(index, currentPiece);
    switchActivePlayer();
    checkForWin();
    checkForTie();
  };

  return { randomizeOrder, activePlayer, playRound };
})();

const VisualController = () => {
  const game = GameController;
  const board = document.querySelector(".game-board");

  const render = () => {
    board.innerHTML = "";

    Gameboard.getBoard().forEach((tile, index) => {
      board.innerHTML += `
      <div class="tile">
      <button data-index="${index}">${tile}</button>
      </div>
      `;
    });
  };

  const clickTile = (e) => {
    if (e.target.innerText) return;
    const index = e.target.dataset.index;
    game.playRound(index);
    render();
  };

  board.addEventListener("click", clickTile);

  render();
};

const players = [Player("Will"), Player("Juni")];

GameController.randomizeOrder(players);

VisualController();
