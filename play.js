let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//selected
let positionOfWhite;

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

shuffle(numbers);

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
  console.log("clicked " + number + "of index " + index);
}



loadTiles();
