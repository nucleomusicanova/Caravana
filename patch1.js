class Patch1 {
  constructor() {
    this.rects = [];
    this.circles = [];
    this.lines = [];
    this.processes = [];
  }

  addRect(x, y, w, h, scale, id) {
    this.rects.push({ x: x, y: y, w: w, h: h, scale: scale, inside: false, id: id, defaultX: x, defaultY: y });
  }

  addCircle(x, y, r, id) {
    this.circles.push({ x: x, y: y, r: r, inside: false, id: id, defaultX: x, defaultY: y });
  }

  addProcess(image, x, y, scale, id) {
    this.processes.push({ image: image, x, y, scale, id, defaultY: y, defaultX: x });
    console.log(this.processes);
  }

  addLine(thing1, thing2) {
    this.lines.push({ thing1, thing2 });
  }

  drawRects(process) {
    this.rects.forEach((thisRect) => {
      if (process.x > thisRect.x && process.x < thisRect.x + thisRect.w && process.y > thisRect.y && process.y < thisRect.y + thisRect.h) {
        fill(255, 0, 0);
        rect(thisRect.x, thisRect.y, thisRect.w, thisRect.h);
        if (!mouseIsPressed) {
          process.x = thisRect.x + thisRect.w / 2 - (process.image.width * process.scale) / 2;
          process.y = thisRect.y + thisRect.h / 2 - (process.image.height * process.scale) / 2;
        }
        process.inside = true;
      } else {
        fill(255);
        rect(thisRect.x, thisRect.y, thisRect.w, thisRect.h);
      }
    });
  }

  drawCircles(process) {
    this.circles.forEach((thisCircle) => {
      fill(255);
      circle(thisCircle.x, thisCircle.y, thisCircle.r);
      if (dist(process.x, process.y, thisCircle.x, thisCircle.y) < thisCircle.r) {
        fill(255, 0, 0);
        circle(thisCircle.x, thisCircle.y, thisCircle.r);
        process.inside = true;
        if (!mouseIsPressed) {
          process.x = thisCircle.x - (process.image.width * process.scale) / 2;
          process.y = thisCircle.y - (process.image.height * process.scale) / 2;
        }
      } else {
        fill(255);
      }
    });
  }

  drawLines(thing1Id, thing2Id) {
    var thing1 = this.rects.find((rect) => rect.id === thing1Id);
    if (!thing1) {
      thing1 = this.circles.find((circle) => circle.id === thing1Id);
    }
    var thing2 = this.rects.find((rect) => rect.id === thing2Id);
    if (!thing2) {
      thing2 = this.circles.find((circle) => circle.id === thing2Id);
    }

    if (!thing1 || !thing2) {
      return;
    }

    var thing1IsCircle = thing1.r;
    var thing1IsRect = thing1.w;
    var thing2IsCircle = thing2.r;
    var thing2IsRect = thing2.w;

    // check if x of thing1 is less than x of thing2
    var thing1IsSameY = thing1.y === thing2.y;
    var thing1IsSameX = thing1.x === thing2.x;
    //
    var thing1IsLeft = thing1.y < thing2.y;
    var thing1IsRight = thing1.y > thing2.y;

    //
    var thing1IsTop = thing1.y < thing2.y;
    var thing1IsBottom = thing1.y > thing2.y;

    if (thing1IsSameX && thing1IsRect && thing2IsRect) {
      stroke(0);
      line(thing1.x + thing1.w / 2, thing1.y + thing1.h, thing2.x + thing2.w / 2, thing2.y);
      return;
    }

    if (thing1IsLeft && thing1IsRect && thing2IsCircle) {
      fill(0);
      stroke(0);
      line(thing1.x + thing1.w, thing1.y + thing1.h / 2, thing2.x - thing2.r / 2, thing2.y);
    }
  }

  drawProcesses() {
    this.processes.forEach((process) => {
      if (
        mouseX > process.x - process.image.width * process.scale &&
        mouseX < process.x + process.image.width * process.scale &&
        mouseY > process.y - process.image.height * process.scale &&
        mouseY < process.y + process.image.height * process.scale
      ) {
        cursor(HAND);
        if (mouseIsPressed) {
          process.x = mouseX;
          process.y = mouseY;
        }
      }
      if (!process.inside && !mouseIsPressed) {
        process.x = process.defaultX;
        process.y = process.defaultY;
      }
      image(process.image, process.x, process.y, process.image.width * process.scale, process.image.height * process.scale);
    });
  }

  draw() {
    // check if mouse is inside processes
    this.processes.forEach((process) => {
      process.inside = false;
      this.drawRects(process);
      this.drawCircles(process);
    });

    this.lines.forEach((line) => {
      this.drawLines(line.thing1, line.thing2);
    });
    this.drawProcesses();
  }
}
