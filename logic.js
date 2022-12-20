const X_SIGN = "X";
const O_SIGN = "O";

const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const resetButton = document.getElementById("resetButton");
const winningMessageTextElement = document.getElementById("winningMessageText");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//resetButton.addEventListener("click", startGame);
let circleTurn = false;
startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  for (let i = 0; i < 9; i++) {
    cellElements[i].innerText == "";
    cellElements[i].removeEventListener("click", handleClick);
    cellElements[i].addEventListener("click", handleClick, { once: true });
  }
  winningMessageElement.classList.add("hide");
  board.classList.remove("hide");
}

function handleClick(e) {
  const cell = e.target;
  const currentSign = circleTurn ? O_SIGN : X_SIGN;

  placeMark(cell, currentSign);
  if (iskWin(currentSign)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  board.classList.add("hide");
  winningMessageElement.classList.remove("hide");
}

function iskWin(currentSign) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].innerText == currentSign;
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.innerText == X_SIGN || cell.innerText == O_SIGN;
  });
}

function placeMark(cell, currentSign) {
  //cell.classList.add(currentClass);
  cell.innerText = currentSign;
}

function swapTurns() {
  circleTurn = !circleTurn;
}
