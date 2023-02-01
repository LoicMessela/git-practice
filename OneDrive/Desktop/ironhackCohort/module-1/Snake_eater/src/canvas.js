const gridElement = document.getElementById("grid");
const startButton = document.getElementById("start-game");
const scoreElement = document.getElementById("score");

//let currentPosition = 0;
const columns = 10;
const rows = 10;
let cells = [];
let score = 0;
let currentPosition = 0;

const snake = {
  positions: [(columns * rows) / 2],
  direction: "right",
  move() {
    const snakeHead = snake.positions[snake.positions.length - 1];
    let nextPosition;
    switch (snake.direction) {
      case "right":
      let isRightBoundary = ((snakeHead + 1) % columns) === 0;
      nextPosition = snakeHead + 1;
      if (isRightBoundary) {
        nextPosition -= columns
        //console.log(snakeHead);
      }
        break;
      case "left":
        let isLeftBoundary = ((snakeHead % columns) === 0)
        nextPosition = snakeHead - 1;
        if(isLeftBoundary){
          nextPosition += columns
        }
        break;
      case "up":
        let isUpBoundary = (snakeHead < columns)
        nextPosition = snakeHead - columns;
        if(isUpBoundary){
          nextPosition += columns
        }     
        break;
      case "down":
        let isDownBoundary = (snakeHead >= (columns * 9))
        nextPosition = snakeHead + columns;
        if(isDownBoundary){
          nextPosition -= columns
        }
        break;
    }
    //console.log(snakeHead)
    this.positions.shift();
    this.positions.push(nextPosition);
  },

  //move based on direction
  changeDirection(newDirection) {
    //Changes snake direction to newDirection.
    this.direction = newDirection;

  },
};

function createTheGrid() {
  for (let i = 0; i < columns * rows; i++) {
    createCell();
  }
}

function createCell() {
  const div = document.createElement("div");
  div.classList.add("cell");
  gridElement.append(div);
  cells.push(div);
}

function createFood(num) {
  const copyCells = [...cells];
  copyCells.splice(currentPosition, 1);

  //console.log(copy)

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * copyCells.length);
    const randomCell = copyCells[randomIndex];
    console.log(copyCells.length);
    console.log(randomCell);
    copyCells.splice(randomIndex, 1);
    randomCell.classList.add("food");
  }

}

function displaySnake(shouldHide) {
  snake.positions.forEach((position) => {
    cells[position].classList[shouldHide ? "remove" : "add"]("snake");
  });
}

function startTheGame() {
  score = 0;
  gridElement.innerHTML = "";
  cells = [];
  currentPosition = 0;
  createTheGrid();
  displaySnake();
  displayScore();
  createFood(1);
}

function refresh() {
  setInterval(() => {
    displaySnake("hide");
    snake.move()
    displaySnake();
  }, 700);
}

window.addEventListener("keydown", (event) => {
  console.log(event.code);
  switch (event.code) {
    case "ArrowLeft":
      snake.changeDirection("left");
      break;
    case "ArrowUp":
      snake.changeDirection("up");
      break;
    case "ArrowRight":
      snake.changeDirection("right");
      break;
    case "ArrowDown":
      snake.changeDirection("down");
  }
});

startTheGame();
refresh();

function displayScore() {}


