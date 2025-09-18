let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//selected
let positionOfWhite;
let shuffled = false;

// function shuffle(array) {
//   let currentIndex = array.length;
//   while (currentIndex != 0) {
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }
// }

// shuffle(numbers);

function loadTiles() {
  const tileContainer = document.getElementById("tiles");
  for (let b = 0; b < numbers.length; b++) {
    const newTile = document.createElement("button");
    newTile.id = `btn${numbers[b]}`;
    newTile.setAttribute("index", b + 1);
    newTile.setAttribute("number", numbers[b]);
    newTile.classList.add("btn");
    newTile.innerHTML = numbers[b];
    if (numbers[b] === 16) {
      newTile.classList.add("selected");
      positionOfWhite = b + 1;
    }
    newTile.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("index"));
      let numb = parseInt(this.getAttribute("number"));
      swap(index, numb, this);
    });

    tileContainer.appendChild(newTile);
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

      let elem = document.querySelector(`[index="${direction}"]`);
      let numb = parseInt(elem.getAttribute("number"));
      swap(direction, numb, elem);
      //   swap(direction);
      if (i >= totalShuffles - 1) {
        shuffled = true;
      }
    }, i * 10);
  }
}

function swap(index, number, elem) {
  if (number === 16) return;
  if (index < 1 || index > 16) return;

  emptyTile = document.getElementById(`btn${16}`);
  const parent = elem.parentNode;
  const elemNext = elem.nextSibling;
  const emptyNext = emptyTile.nextSibling;
  let x = parseInt(emptyTile.getAttribute("index"));
  //check if his moving right
  if (index == positionOfWhite + 1) {
    if (index % 4 != 1) {
      parent.insertBefore(elem, emptyTile);
      emptyTile.setAttribute("index", index);
      elem.setAttribute("index", x);
      positionOfWhite = index;
    }
    //check if his moving left
  } else if (index == positionOfWhite - 1) {
    if (index % 4 != 0) {
      parent.insertBefore(emptyTile, elem);
      emptyTile.setAttribute("index", index);
      elem.setAttribute("index", x);
      positionOfWhite = index;
    }
    //check if his moving up
  } else if (index == positionOfWhite - 4) {
    const placeholder = document.createElement("button");
    placeholder.classList.add("btn");
    placeholder.innerHTML = 0;
    parent.insertBefore(placeholder, elem);
    parent.insertBefore(elem, emptyTile);
    parent.insertBefore(emptyTile, placeholder);
    parent.removeChild(placeholder);

    elem.setAttribute("index", x);
    emptyTile.setAttribute("index", index);
    positionOfWhite = index;
    //check if his moving down
  } else if (index == positionOfWhite + 4) {
    const placeholder = document.createElement("button");
    placeholder.classList.add("btn");
    placeholder.innerHTML = 0;
    parent.insertBefore(placeholder, elem);
    parent.insertBefore(elem, emptyTile);
    parent.insertBefore(emptyTile, placeholder);
    parent.removeChild(placeholder);

    elem.setAttribute("index", x);
    emptyTile.setAttribute("index", index);
    positionOfWhite = index;
  }
  if (shuffled) {
    if (checkWinner()) {
      alert("win win win");
      reset();
    }
  }
  console.log("clicked " + number + "of index " + index);
}

function checkWinner() {
  for (let i = 1; i <= 16; i++) {
    const currentTile = document.getElementById(`btn${i}`);
    const number = parseInt(currentTile.getAttribute("number"));
    const index = parseInt(currentTile.getAttribute("index"));
    if (number !== index) {
      return false;
    }
  }
  return true;
}

function newGame() {
  loadTiles();
  setTimeout(() => {
    shuffle();
  }, 500);
}

function reset() {
  let e = document.getElementById('tiles');
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  newGame()
}

newGame();
