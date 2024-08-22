
// Patch
var patch = new Patch1();



// Background color
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
  

  // Patch1
  patch.addRect(10, 150, 100, 100, 1, "rect1");
  patch.addRect(10, 300, 100, 100, 1, "rect2");
  patch.addCircle(200, 350, 100, "circle1");
  patch.addProcess(Synth, 10, 10, 0.1, "synth");

  // Draw Lines
  patch.addLine("rect1", "rect2");
  patch.addLine("rect2", "circle1");



}

// ===============================
function draw() {
  cursor(ARROW);

  background(backgroundColor);
  patch.draw();

}

