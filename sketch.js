/* VARIABLES */
let player, walls;
let gameWon = false;
let playerLocked = false;
/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600, 600);

  // Create player
  player = {
    x: 350,
    y: 50,
    w: 40,
    h: 40,
    speed: 3
  };

  // Create maze walls
  walls = [];

  walls.push({ x: 10, y: 200, w: 5, h: 385 }); // Left Wall

  walls.push({ x: 160, y: 10, w: 300, h: 5 }); // Top Line
  walls.push({ x: 150, y: 60, w: 5, h: 100 }); // Top Middle Line
  walls.push({ x: 190, y: 197, w: 185, h: 5 }); // Middle Line horizontal
  walls.push({ x: 470, y: 197, w: 250, h: 5 }); // Middle Line horizontal
  walls.push({ x: 392, y: 297, w: 5, h: 92 }); // Middle Line vertical
  walls.push({ x: 392, y: 102, w: 5, h: 85 }); // Bottom Line 01

  walls.push({ x: 285, y: 198, w: 5, h: 109 }); // Right Wall 02 
  walls.push({ x: 595, y: 200, w: 5, h: 380 }); // Right Wall

  walls.push({ x: 185, y: 332, w: 5, h: 109 }); // Bottom Middle Line
  walls.push({ x: 340, y: 146, w: 110, h: 5 }); // Bottom Line 04
  walls.push({ x: 340, y: 250, w: 110, h: 5 }); // Bottom Line 03
  walls.push({ x: 50, y: 300, w: 75, h: 5 }); // Bottom Line 02
  walls.push({ x: 348, y: 390, w: 500, h: 5 }); // Bottom Line Main
}

/* DRAW LOOP REPEATS */
function draw() {
  background(255);

  if (!gameWon) {
    let moveX = 0;
    let moveY = 0;

    // =================================
    // PART 1: PLAYER MOVEMENT
    // =================================



    if (keyIsDown(LEFT_ARROW)) moveX = -player.speed;
    if (keyIsDown(RIGHT_ARROW)) moveX = player.speed;
    if (keyIsDown(UP_ARROW)) moveY = -player.speed;
    if (keyIsDown(DOWN_ARROW)) moveY = player.speed;

    // =================================
    // PART 2: WALL COLLISION
    // =================================

    player.x += moveX;
    if (touchingWall()) {
      player.x -= moveX;
    }

    player.y += moveY;
    if (touchingWall()) {
      player.y -= moveY;
    }

    // =================================
    // PART 3: CANVAS BOUNDARIES
    // =================================

    player.x = constrain(player.x, player.w / 2, width - player.w / 2);
    player.y = constrain(player.y, player.h / 2, height - player.h / 2);

  }
  // =================================
  // PART 4: WIN CONDITION
  // =================================

  // TODO: Check if the player reaches the End.

  if (player.x < 50 && player.y > 350) {
    gameWon = true;
    playerLocked = true;
    console.log("You Win!");
  }


  // =================================
  // DRAW MAZE
  // =================================

  fill(0);
  noStroke();
  rectMode(CENTER);

  for (let wall of walls) {
    rect(wall.x, wall.y, wall.w, wall.h);
  }

  // Draw player
  fill(100, 150, 255);
  rect(player.x, player.y, player.w, player.h);

  // Draw Start and End
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("Start", 330, 20);
  text("End", 35, 380);


  // =================================
  // PART 5: WIN MESSAGE
  // =================================

  if (gameWon) {
    // fill(0);
    textSize(32);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
  }

} // END DRAW


/* WALL COLLISION DETECTION */

function touchingWall() {
  // Hint: Use a for loop to check each wall.
  // Hint: Use player.x, player.y, player.w, player.h.
  // Hint: Compare the player's boundaries against the wall's boundaries.
  for (let wall of walls) {
    let overlaps =
      player.x + player.w / 2 > wall.x - wall.w / 2 &&
      player.x - player.w / 2 < wall.x + wall.w / 2 &&
      player.y + player.h / 2 > wall.y - wall.h / 2 &&
      player.y - player.h / 2 < wall.y + wall.h / 2;

    if (overlaps) {
      return true;
    }
  }

  return false;
}
