const HEIGHT = 10;
const WIDTH = 10;
const BOARD = [];
for (let i = 0; i < HEIGHT; i++) {
  BOARD.push([]);
  for (let j = 0; j < WIDTH; j++) {
    BOARD[i].push({
      color: "grey",
      occupied: false,
    });
  }
}
let currentShape;
// Array holding all possible shapes in row/col coordinates
const SHAPES = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ], // I
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ], // O
  [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ], //S
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ], // Z
  [
    [0, 1],
    [1, 1],
    [2, 1],
    [2, 0],
  ], // L
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ], // J
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ], // T
];

//return a random entry from the array of shapes
const getRandomShape = () => {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
};

// get a new shape and set its initial coordinates
const getNewShape = () => {
  const shape = {};
  shape.shape = getRandomShape(); // get random shape from the array of shapes
  shape.offset = [0, Math.floor(WIDTH / 2)]; //set its initial coordinates to be top of the board, in the middle
  return shape;
};
// print the board state to console in a nice way
const printBoard = () => {};
//TODO a function which takes a board an renders it to the page
const renderBoard = () => {
  const boardDOM = document.createElement("div");
  boardDOM.classList.add("board");
  document.body.appendChild(boardDOM);
  // loop through the rows
  for (let i = 0; i < BOARD.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    // loop through the items in each row
    for (let j = 0; j < BOARD[i].length; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.backgroundColor = BOARD[i][j].color;
      square.innerText = "" + i + "," + j;
      square.setAttribute("id", `row${i}col${j}`);
      if (BOARD[i][j].occupied) {
        square.classList.add("piece");
      }
      row.appendChild(square);
    }
    boardDOM.appendChild(row);
  }
};
// just a function update board which just draws a blank board and piece on top of it
// function which adds the shape onto the board
const drawShape = () => {
  // iterate over shape's coordinates
  for (let i = 0; i < currentShape.shape.length; i++) {
    // place shape at r,c position on the board
    let r = currentShape.shape[i][0] + currentShape.offset[0];
    let c = currentShape.shape[i][1] + currentShape.offset[1];
    //BOARD[r][c].color = "red";
    let target = document.querySelector(`#row${r}col${c}`);
    target.style.backgroundColor = "red";
  }
};

// clear the shape from the board
const clearShape = () => {
  // iterate over shape's coordinates
  for (let i = 0; i < currentShape.shape.length; i++) {
    // clear shape at r,c position on the board
    let r = currentShape.shape[i][0] + currentShape.offset[0];
    let c = currentShape.shape[i][1] + currentShape.offset[1];
    // BOARD[r][c].color = "grey";
    let target = document.querySelector(`#row${r}col${c}`);
    target.style.backgroundColor = "grey";
  }
};


const movePiece = (direction) => {
    clearShape();
    if (direction === "right") {
      currentShape.offset[1] += 1;
    } else if (direction === "left") {
      currentShape.offset[1] -= 1;
    }
    drawShape();

};

// return true if a collision will occur. Need to check: left right walls
const isHitWall = (direction) => {
  // if direction is left, look at every point in the shape and see if shape point[0] + offsetC !== 0
  let collision = false;
  let offsetC = currentShape.offset[1];
  if (direction === "left") {
    collision = currentShape.shape.some((piece) => {
      return offsetC + piece[1] === 0;
    });
  }
  else if (direction === "right"){
    collision = currentShape.shape.some((piece) => {
      return offsetC + piece[1] === WIDTH - 1 ;
    });
  }
  return collision;
};

document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
  currentShape = getNewShape();
  drawShape(); // need to clear out the old shape before drawing with updated position
  document.addEventListener("keydown", (e) => {
    //  console.log(e)
    if (e.keyCode == 39) {
      //console.log("right");
      if(!isHitWall("right")){
        movePiece("right");
      }
    } else if (e.keyCode == 37) {
      if (!isHitWall("left")){
        movePiece("left");
      }
    }
  });
});
// checkCollisions(<coordinates of space to move into>, <direction>, <boardState>"

// TODO a function which takes a board and applies gravity to the active piece
// work from bottom up looking for the piece
// check if piece will hit bottom if yes change it from active
// todo rotation logic - what if rotation makes a collision?
// todo a function which appends the piece to the board, changing the squares occupied to true
