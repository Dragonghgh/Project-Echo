const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const TILE = 32;

// 0 = floor, 1 = wall
const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let player = {
  x: 2 * TILE,
  y: 2 * TILE,
  size: 20,
  speed: 2
};

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function canMove(nx, ny) {
  const left = Math.floor(nx / TILE);
  const right = Math.floor((nx + player.size) / TILE);
  const top = Math.floor(ny / TILE);
  const bottom = Math.floor((ny + player.size) / TILE);

  return (
    map[top][left] === 0 &&
    map[top][right] === 0 &&
    map[bottom][left] === 0 &&
    map[bottom][right] === 0
  );
}

function update() {
  let nx = player.x;
  let ny = player.y;

  if (keys["ArrowUp"]) ny -= player.speed;
  if (keys["ArrowDown"]) ny += player.speed;
  if (keys["ArrowLeft"]) nx -= player.speed;
  if (keys["ArrowRight"]) nx += player.speed;

  if (canMove(nx, player.y)) player.x = nx;
  if (canMove(player.x, ny)) player.y = ny;
}

function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      ctx.fillStyle = map[y][x] === 1 ? "#222" : "#000";
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawMap();
  drawPlayer();
  requestAnimationFrame(loop);
}

loop();
