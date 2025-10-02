let shuffled = false;
const SIZE = 4;
let positionOfWhite = 16;

const board = document.getElementById("tiles");

function load(n) {
  for (let i = 1; i <= n; i++) {
    const newTile = document.createElement("button");
    newTile.id = `btn${i}`;
    newTile.classList.add("btn");
    newTile.setAttribute("index", i);
    newTile.innerHTML = i;

    newTile.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("index"));
      swap(index);
    });
    board.appendChild(newTile);
  }
  const white = document.getElementById(`btn${n}`);
  white.classList.add("selected");
}

function shuffle() {
  let totalShuffles = 100 + 54 * Math.floor(Math.random() * SIZE);
  for (let i = 1; i <= totalShuffles; i++) {
    let x = Math.floor(Math.random() * 4);
    let direction = 0;
    switch (x) {
      case 0:
        direction = positionOfWhite + 1;
        break;
      case 1:
        direction = positionOfWhite - 1;
        break;
      case 2:
        direction = positionOfWhite + SIZE;
        break;
      case 3:
        direction = positionOfWhite - SIZE;
        break;
    }
    swap(direction);
    shuffled = true;
  }
}

function swap(index) {
  if (index < 1 || index > SIZE ** 2) return;
  // check if moving right
  if (index == positionOfWhite + 1) {
    if (index % SIZE != 1) {
      setWhiteTile(index);
    }
  } else if (index == positionOfWhite - 1) {
    if (index % SIZE != 0) {
      setWhiteTile(index);
    }
  } else if (index == positionOfWhite - SIZE) {
    setWhiteTile(index);
  } else if (index == positionOfWhite + SIZE) {
    setWhiteTile(index);
  }
  if (shuffled) {
    if (checkWin()) {
      alert("win win win");
      reset();
    }
  }
}

function checkWin() {
  for (let i = 1; i <= SIZE ** 2; i++) {
    let tile = document.getElementById(`btn${i}`);

    if (parseInt(tile.innerHTML) !== parseInt(tile.getAttribute("index")))
      return false;
  }
  return true;
}

function setWhiteTile(index) {
  currentTile = document.getElementById(`btn${positionOfWhite}`);
  currentTileText = currentTile.innerHTML;
  otherTile = document.getElementById(`btn${index}`);
  currentTile.innerHTML = otherTile.innerHTML;
  currentTile.classList.remove("selected");
  otherTile.classList.add("selected");
  otherTile.innerHTML = currentTileText;
  positionOfWhite = index;
}

function reset() {
  let e = document.getElementById("tiles");
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  newGame();
}

function newGame() {
  load(SIZE ** 2);
  setTimeout(() => {
    shuffle();
  }, 400);
}

newGame()
