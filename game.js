let shuffled = false;
const SIZE = 4;
let positionOfWhite = 16;

const board = document.getElementById("tiles");

function load(n) {
  board.innerHTML = "";
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
    setTimeout(() => {
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
    }, i * 10);
  }
  setTimeout(() => {
    shuffled = true;
  }, totalShuffles * 10 + 50);
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

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      swap(positionOfWhite - SIZE);
      break;
    case "ArrowDown":
      swap(positionOfWhite + SIZE);
      break;
    case "ArrowRight":
      swap(positionOfWhite + 1);
      break;
    case "ArrowLeft":
      swap(positionOfWhite - 1);
      break;
  }
});

document.getElementById("shuffle").addEventListener("click", function () {
  shuffled = false;
  shuffle();
})

function checkWin() {
  for (let i = 1; i <= SIZE ** 2; i++) {
    let tile = document.getElementById(`btn${i}`);

    if (parseInt(tile.innerHTML) !== parseInt(tile.getAttribute("index")))
      return false;
  }
  return true;
}

function setWhiteTile(index) {
  let currentTile = document.getElementById(`btn${positionOfWhite}`);
  let currentTileText = currentTile.innerHTML;
  let otherTile = document.getElementById(`btn${index}`);
  currentTile.innerHTML = otherTile.innerHTML;
  currentTile.classList.remove("selected");
  otherTile.classList.add("selected");
  otherTile.innerHTML = currentTileText;
  positionOfWhite = index;
}

function reset() {
  shuffled = false;
  shuffle();
}

function newGame() {
  load(SIZE ** 2);
  setTimeout(() => {
    shuffle();
  }, 400);
}

newGame();
