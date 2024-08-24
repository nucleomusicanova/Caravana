// Patch
var patch = new Patch1();

// Background color
// const backgroundColor = 250;
const bColor = { r: 48, g: 48, b: 48 };
const fColor = { r: 233, g: 233, b: 233 };

var Synth1;
var Synth2;
var Sound;

function preload() {
  Synth1 = loadImage("svg/synth.svg");
  Synth2 = loadImage("svg/synth.svg");
  Sound = loadImage("svg/sound.svg");
}

function setup() {
  let myCanvas;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // get the width of the device
    var width = window.innerWidth - window.innerWidth * 0.1;
    myCanvas = createCanvas(width, width * 1.25);
  } else {
    myCanvas = createCanvas(500, 600);
  }
  myCanvas.parent("mySketch");
  background(bColor.r, bColor.g, bColor.b);
  pixelDensity(1);
  imageMode(CORNER);

  // Patch1
  patch.addRect(10, 150, 100, 100, 1, fColor, "rect1");
  patch.addRect(10, 300, 100, 100, 1, fColor, "rect2");
  patch.addCircle(200, 350, 100, fColor, "circle1");
  patch.addImageRect(Sound, 300, 300, 0.125, "dac");

  // Synth
  patch.addHackRect(10, 10, 86, 50, 1, "MidiSynth", "defaultSynth");
  patch.addProcess(Synth1, 13, 13, 0.1, { r: 155, g: 0, b: 0 }, "synth");

  // Synth2
  patch.addHackRect(110, 10, 86, 50, 1, "MidiSynth2", "defaultSynth2");
  patch.addProcess(Synth2, 113, 13, 0.1, { r: 0, g: 0, b: 155 }, "synth2");

  // Synth3
  patch.addHackRect(220, 10, 86, 50, 1, "MidiSynth3", "defaultSynth3");
  patch.addProcess(Synth2, 223, 13, 0.1, { r: 0, g: 155, b: 0 }, "synth3");

  // Draw Lines
  patch.addLine("rect1", "rect2");
  patch.addLine("rect2", "circle1");
  patch.addLine("circle1", "dac");
}

// ===============================
function draw() {
  cursor(ARROW);
  background(bColor.r, bColor.g, bColor.b);
  patch.draw();
}

function doubleClicked() {
  // patch.doubleClicked();
}

// function touchStarted() {
//   // Check if touch is within the circle
//   if (dist(touchX, touchY, circleX, circleY) < circleSize / 2) {
//     dragging = true;
//     // Calculate offset to maintain relative position while dragging
//     offsetX = circleX - touchX;
//     offsetY = circleY - touchY;
//   }
// }

// // Touch moved
// function touchMoved() {
//   // Update circle position if dragging
//   if (dragging) {
//     circleX = touchX + offsetX;
//     circleY = touchY + offsetY;
//     mouseX = touchX;
//     mouseY = touchY;
//   }
//   return false; // Prevents default behavior
// }

// function touchEnded() {
//   // Stop dragging when touch ends
//   dragging = false;
// }

// if p is pressed, then save the canvas as a png
function keyPressed() {
  if (key === "p") {
    saveCanvas("patch1", "png");
  }
}
