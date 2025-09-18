// fill in the tiles in id tiles

const tileContainer = document.getElementById("tiles");
let positionOfWhite = 16;
let shuffled = false;

function loadTiles() {
  for (let b = 1; b <= 16; b++) {
    const newTile = document.createElement("button");
    newTile.id = `btn${b}`;
    newTile.setAttribute("index", b);
    newTile.innerHTML = b;
    newTile.classList.add("btn");
    newTile.addEventListener("click", function () {
      move(parseInt(this.getAttribute("index")));
    });
    tileContainer.appendChild(newTile);
  }
  let whiteTileId = "btn" + positionOfWhite;
  let whiteTile = document.getElementById(whiteTileId);
  whiteTile.classList.add("selected");
}

//move single tile
function move(clicked) {
  if (clicked < 1 || clicked > 16) {
    return;
  }

  //check if his moving right
  if (clicked == positionOfWhite + 1) {
    if (clicked % 4 != 1) {
      setSelected(clicked);
    }

    //check if his moving left
  } else if (clicked == positionOfWhite - 1) {
    if (clicked % 4 != 0) {
      setSelected(clicked);
    }
    //check if his moving up
  } else if (clicked == positionOfWhite - 4) {
    setSelected(clicked);
    //check if his moving down
  } else if (clicked == positionOfWhite + 4) {
    setSelected(clicked);
  }
}

function shuffle() {
  let minShuffles = 100;
  let totalShuffles =
    minShuffles + Math.floor(Math.random() * (200 - 100) + 100);
  for (let i = minShuffles; i <= totalShuffles; i++) {
    setTimeout(function timer() {
      let x = Math.floor(Math.random() * 4);
      let direction = 0;
      if (x == 0) {
        direction = positionOfWhite + 1;
      } else if (x == 1) {
        direction = positionOfWhite - 1;
      } else if (x == 2) {
        direction = positionOfWhite + 4;
      } else if (x == 3) {
        direction = positionOfWhite - 4;
      }

      move(direction);
      if (i >= totalShuffles - 1) {
        shuffled = true;
      }
    }, i * 10);
  }
}

// swap clicked tile with white
function setSelected(clicked) {
  currentTile = document.getElementById(`btn${positionOfWhite}`);
  currentTileText = currentTile.innerHTML;
  currentTile.classList.remove("selected");
  newTile = document.getElementById(`btn${clicked}`);
  currentTile.innerHTML = newTile.innerHTML;
  newTile.innerHTML = currentTileText;
  newTile.classList.add("selected");
  positionOfWhite = clicked;
}

function newGame() {
  loadTiles();
  setTimeout(() => {
    shuffle();
  }, 500);
}

newGame()