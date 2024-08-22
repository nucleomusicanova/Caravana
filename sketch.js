var Synth;
const SynthScale = 0.1;
var SynthPos = { x: 10, y: 10, offsetX: 0, offsetY: 0 };

var rect1 = { x: 10, y: 150, w: 100, h: 100 };
var insideRect1 = false;
var rect2 = { x: 10, y: 300, w: 100, h: 100 };
var insideRect2 = false;

var circle1 = { x: 200, y: 350, r: 100 };
var insideCircle1 = false;

const backgroundColor = 245;

function preload() {
  Synth = loadImage("svg/synth.svg");
}

function setup() {
  let myCanvas = createCanvas(400, 500);
  myCanvas.parent("mySketch");
  background(backgroundColor);
  pixelDensity(1);
  imageMode(CORNER);
  image(
    Synth,
    SynthPos.x,
    SynthPos.y,
    Synth.width * SynthScale,
    Synth.height * SynthScale
  );
}

function drawPatch() {
  fill(255);
  stroke(0);

  // draw rect1
  rect(rect1.x, rect1.y, rect1.w, rect1.h);
  // check if the center of the synth is inside the rect1
  if (
    SynthPos.x > rect1.x &&
    SynthPos.x < rect1.x + rect1.w &&
    SynthPos.y > rect1.y &&
    SynthPos.y < rect1.y + rect1.h
  ) {
    fill(255, 0, 0);
    rect(rect1.x, rect1.y, rect1.w, rect1.h);
    if (!mouseIsPressed) {
      SynthPos.x = rect1.x + rect1.w / 2 - (Synth.width * SynthScale) / 2;
      SynthPos.y = rect1.y + rect1.h / 2 - (Synth.height * SynthScale) / 2;
    }
    insideRect1 = true;
  } else {
    fill(255);
    insideRect1 = false;
  }

  // draw rect2
  fill(255);
  rect(rect2.x, rect2.y, rect2.w, rect2.h);
  if (
    SynthPos.x > rect2.x &&
    SynthPos.x < rect2.x + rect2.w &&
    SynthPos.y > rect2.y &&
    SynthPos.y < rect2.y + rect2.h
  ) {
    fill(255, 0, 0);
    rect(rect2.x, rect2.y, rect2.w, rect2.h);
    if (!mouseIsPressed) {
      SynthPos.x = rect2.x + rect2.w / 2 - (Synth.width * SynthScale) / 2;
      SynthPos.y = rect2.y + rect2.h / 2 - (Synth.height * SynthScale) / 2;
    }
    insideRect2 = true;
  } else {
    fill(255);
    insideRect2 = false;
  }

  // draw circle1
  fill(255);
  circle(circle1.x, circle1.y, circle1.r);
  if (dist(SynthPos.x, SynthPos.y, circle1.x, circle1.y) < circle1.r) {
    fill(255, 0, 0);
    circle(circle1.x, circle1.y, circle1.r);
    insideCircle1 = true;
    if (!mouseIsPressed) {
      SynthPos.x = circle1.x - (Synth.width * SynthScale) / 2;
      SynthPos.y = circle1.y - (Synth.height * SynthScale) / 2;
    }
  } else {
    fill(255);
    insideCircle1 = false;
  }

  // create a line between the bottom of rect1 and the top of rect2
  stroke(0);
  line(
    rect1.x + rect1.w / 2,
    rect1.y + rect1.h,
    rect2.x + rect2.w / 2,
    rect2.y
  );
  // create a line between the left corner of rect2 and the right corner of circle1
  line(rect2.x + rect2.w, rect2.y + rect2.h / 2, circle1.x - (circle1.r / 2), circle1.y);
}

// ===============================
function draw() {
  cursor(ARROW);
  if (
    mouseX > SynthPos.x - Synth.width * SynthScale &&
    mouseX < SynthPos.x + Synth.width * SynthScale &&
    mouseY > SynthPos.y - Synth.height * SynthScale &&
    mouseY < SynthPos.y + Synth.height * SynthScale
  ) {
    cursor(HAND);
    if (mouseIsPressed) {
      SynthPos.x = mouseX;
      SynthPos.y = mouseY;
    }
  }

  background(backgroundColor);
  drawPatch();

  if (!insideRect1 && !insideRect2 && !insideCircle1 && !mouseIsPressed) {
    SynthPos.x = 10;
    SynthPos.y = 10;
  }
  image(
    Synth,
    SynthPos.x,
    SynthPos.y,
    Synth.width * SynthScale,
    Synth.height * SynthScale
  );
}
