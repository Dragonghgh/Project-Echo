const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameState = "menu";

let saveData = {
  room: "Entrance",
  monsterReleased: false,
  notesRead: []
};

const rooms = {
  "Entrance": "You wake up near a sealed exit. Power is unstable.",
  "Main Hall": "Emergency lights flicker along the corridor.",
  "Storage": "Broken equipment is scattered everywhere.",
  "Control Room": "The door is locked. A keycard is required.",
  "Test Chamber": "This is where the experiment took place."
};

function newGame() {
  localStorage.removeItem("echo_save");
  saveData = {
    room: "Entrance",
    monsterReleased: false,
    notesRead: []
  };
  startGame();
}

function continueGame() {
  const save = localStorage.getItem("echo_save");
  if (save) saveData = JSON.parse(save);
  startGame();
}

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    canvas.classList.remove("hidden");
    gameState = "play";
    draw();
  }, 1200);
}

document.addEventListener("keydown", e => {
  if (gameState !== "play") return;

  if (e.key === "ArrowUp") move("Main Hall");
  if (e.key === "ArrowRight") move("Storage");
  if (e.key === "ArrowDown") move("Test Chamber");

  save();
  draw();
});

function move(target) {
  if (target === "Control Room" && !saveData.monsterReleased) return;
  saveData.room = target;

  if (target === "Test Chamber" && !saveData.monsterReleased) {
    saveData.monsterReleased = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#aaa";
  ctx.font = "18px monospace";
  ctx.fillText("Location: " + saveData.room, 30, 40);

  ctx.fillStyle = "#777";
  wrapText(rooms[saveData.room], 30, 80, 740, 22);

  if (saveData.monsterReleased) {
    ctx.fillStyle = "#500";
    ctx.fillText("WARNING: Unknown entity detected.", 30, 440);
  }
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function save() {
  localStorage.setItem("echo_save", JSON.stringify(saveData));
}
