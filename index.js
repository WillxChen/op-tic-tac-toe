/* To-Do
  - Apply game logic to allow players to choose a tile to play on


  Game Flow
  - Randomize who gets to play first
  - Player chooses a tile to play on and game checks if square is already filled
    - if tile is already filled then return error
    - if tile is empty then fill tile in gameBoard with piece
    - update the tile and rerender the gameBoard
  - gameFlow now passes control to the opposing player
*/

const Gameboard = (() => {
  // Gameboard is responsible for storing the game assets and updating the DOM
  const board = document.querySelector(".game-board");
  const gameBoard = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

  const render = () => {
    board.innerHTML = "";

    gameBoard.forEach((tile, index) => {
      board.innerHTML += `
      <div class="tile" data-index="${index}">
      <button>${tile}</button>
      </div>
      `;
    });
  };

  const addPiece = (tile, piece) => {
    const index = tile.dataset.index;
    if (!gameBoard[index]) {
      gameBoard[index] = piece;
    }
  };

  render();
  return { addPiece };
})();

const Player = (name) => {
  // Store player information like wins, losses, and name
  const piece = "";
  return { name, piece };
};

const GameFlow = (() => {
  // Handles turn order
})();

const GameController = (() => {
  let activePlayer = [];
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

  return { randomizeOrder, activePlayer };
})();

const players = [Player("Will"), Player("Juni")];

GameController.randomizeOrder(players);
