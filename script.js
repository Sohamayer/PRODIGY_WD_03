const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const resetBtn = document.getElementById("resetBtn");
const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Check for win or draw
function checkWin() {
  for (let combo of winningCombinations) {
    const [a,b,c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      turnText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameOver = true;
      return true;
    }
  }
  if (!gameState.includes("")) {
    turnText.textContent = "It's a Draw!";
    gameOver = true;
    return true;
  }
  return false;
}

// Handle human click
function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  if (gameState[index] !== "" || gameOver) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (!checkWin()) {
    if (getMode() === "ai" && currentPlayer === "X") {
      currentPlayer = "O";
      turnText.textContent = `AI's Turn`;
      setTimeout(aiMove, 500); // AI moves after 0.5s
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Random AI logic
function aiMove() {
  const emptyIndices = gameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  gameState[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (!checkWin()) {
    currentPlayer = "X";
    turnText.textContent = `Player X's Turn`;
  }
}

function getMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));

resetBtn.addEventListener("click", () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  turnText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
});
