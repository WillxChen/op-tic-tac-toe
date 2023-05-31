/* To-Do
  - Set up CSS grid with 9x9 grid
*/

const Gameboard = (() => {
  const tile = document.querySelectorAll(".tile");
  const gameBoard = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

  const gameFlow = () => {};

  const render = () => {
    tile.forEach((tile, index) => {
      tile.innerHTML = `<p>${gameBoard[index]}</p>`;
    });
  };
  render();
})();

const Player = (name) => {
  return { name };
};
