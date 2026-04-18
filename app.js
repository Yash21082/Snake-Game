let eatSound = new Audio("assets/music/food.mp3");
let gameOverSound = new Audio("assets/music/gameover.mp3");
let moveSound = new Audio("assets/music/move.mp3");
let bgSound = new Audio("assets/music/music.mp3");
let direction = { x: 0, y: 0 };
let lastupdatetime = 0;
let board = document.getElementById("board");
let score = 0;
let scoreOrg = document.getElementById("score");
let highScore = document.getElementById("Highscore");
// localStorage.setItem("highScore", "0");
let highScoreVal = localStorage.getItem("highScore");
let snakeArr = [
  {
    x: 13,
    y: 12,
  },
];
let food = { x: 15, y: 16 };
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastupdatetime) / 1000 < 0.1 /*0.5 is seconds*/) {
    return;
  }
  lastupdatetime = ctime;

  gameEngine();
}
function isCollide(skrr) {
  for (let i = 1; i < skrr.length; i++) {
    if (skrr[0].x == skrr[i].x && skrr[0].y == skrr[i].y) {
      return true;
    }
  }
  if (skrr[0].x >= 18 || skrr[0].x <= 0 || skrr[0].y >= 18 || skrr[0].y <= 0) {
    return true;
  }
  false;
}
function gameEngine() {
      highScore.innerHTML = "High Score : " + highScoreVal;

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    bgSound.pause();
    alert("Game over !! ");
    score = 0;
    direction = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 12 }];
    scoreOrg.innerHTML = "Score : ";
  }

  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    eatSound.play();
    
    score++;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highScore", highScoreVal);
      highScore.innerHTML = "High Score : " + highScoreVal;
    }
    else{
      highScore.innerHTML = "High Score : " + highScoreVal;

    }
    scoreOrg.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });

    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeBody = document.createElement("div");
    snakeBody.style.gridRowStart = e.x;
    snakeBody.style.gridColumnStart = e.y;
    board.appendChild(snakeBody);
    if (index === 0) {
      snakeBody.classList.add("snakeHead");
    } else {
      snakeBody.classList.add("snakeBody");
    }
  });
  let snakefood = document.createElement("div");
  snakefood.classList.add("snakefood");

  snakefood.style.gridRowStart = food.x;
  snakefood.style.gridColumnStart = food.y;
  board.appendChild(snakefood);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      direction.x = -1;
      direction.y = 0;
      moveSound.play();
      bgSound.play();
      break;

    case "ArrowDown":
      direction.x = 1;
      direction.y = 0;
      moveSound.play();

      bgSound.play();

      break;

    case "ArrowRight":
      direction.x = 0;
      direction.y = 1;
      moveSound.play();

      bgSound.play();

      break;
    case "ArrowLeft":
      direction.x = 0;
      direction.y = -1;
      moveSound.play();
      bgSound.play();

      break;

    default:
      break;
  }
});
