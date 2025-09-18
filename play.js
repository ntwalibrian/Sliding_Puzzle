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
      swap(index, numb);
    });

    tileContainer.appendChild(newTile);
  }
}

function swap(index, number) {
  if (number === 16) {
    return;
  }
  if (index < 1 || index > 16) {
    return;
  }
  //check if his moving right
  if (clicked == positionOfWhite + 1) {
    if (clicked % 4 != 1) {
    }
    //check if his moving left
  } else if (clicked == positionOfWhite - 1) {
    if (clicked % 4 != 0) {
    }
    //check if his moving up
  } else if (clicked == positionOfWhite - 4) {
    //check if his moving down
  } else if (clicked == positionOfWhite + 4) {
  }
  console.log("clicked " + number + "of index " + index);
}

loadTiles();
