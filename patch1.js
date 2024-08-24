var mouseOrTouchX = 0;
var mouseOrTouchY = 0;

class Patch1 {
  constructor() {
    this.rects = [];
    this.hackRects = [];
    this.imageRects = [];
    this.circles = [];
    this.lines = [];
    this.processes = [];
    this.colors = [];
    this.someIsSelected = false;
  }

  addRect(x, y, w, h, scale, color, id) {
    this.rects.push({
      x: x,
      y: y,
      w: w,
      h: h,
      scale: scale,
      inside: false,
      id: id,
      defaultX: x,
      defaultY: y,
      draw: false,
      color: color,
    });
  }

  addImageRect(image, x, y, scale, id) {
    this.imageRects.push({
      image: image,
      x: x,
      y: y,
      w: image.width,
      h: image.height,
      scale: scale,
      id: id,
    });
  }

  addHackRect(x, y, w, h, scale, label, id) {
    this.hackRects.push({ x: x, y: y, w: w, h: h, label: label, id: id, draw: false });
  }

  addCircle(x, y, r, color, id) {
    this.circles.push({
      x: x,
      y: y,
      r: r,
      inside: false,
      id: id,
      defaultX: x,
      defaultY: y,
      draw: false,
      color: color,
    });
  }

  addProcess(image, x, y, scale, color, id) {
    this.processes.push({ image: image, x, y, scale, color, id, defaultY: y, defaultX: x });
    // console.log(this.processes);
  }

  addLine(thing1, thing2) {
    this.lines.push({ thing1, thing2 });
  }

  setColor(id, color) {
    this.colors.push({ id, color });
    // console.log(this.colors);
  }

  getColor(id) {
    var color = this.colors.find((color) => color.id === id);
    // console.log(color
    return color;
  }

  drawHackRects() {
    this.hackRects.forEach((thisRect) => {
      noStroke();
      fill(fColor.r, fColor.g, fColor.b);
      rect(thisRect.x, thisRect.y, thisRect.w, thisRect.h, 3, 3);
      fill(fColor.r, fColor.g, fColor.b);
      textSize(12);
      text(thisRect.label, thisRect.x + 13, thisRect.y + 65);
    });
  }

  drawImageRects() {
    this.imageRects.forEach((thisImage) => {
      image(thisImage.image, thisImage.x, thisImage.y, thisImage.w * thisImage.scale, thisImage.h * thisImage.scale);
    });
  }

  drawRects(process) {
    this.rects.forEach((thisRect) => {
      thisRect.inside = true;
      if (process.x > thisRect.x && process.x < thisRect.x + thisRect.w && process.y > thisRect.y && process.y < thisRect.y + thisRect.h) {
        if (!mouseIsPressed) {
          process.x = thisRect.x + thisRect.w / 2 - (process.image.width * process.scale) / 2;
          process.y = thisRect.y + thisRect.h / 2 - (process.image.height * process.scale) / 2;
        }
        process.inside = true;
        thisRect.inside = true;
        if (process.house === null) {
          process.house = thisRect;
        }
      }
      if (process.house && process.house.id === thisRect.id) {
        fill(thisRect.color.r, thisRect.color.g, thisRect.color.b);
      } else {
        fill(fColor.r, fColor.g, fColor.b);
      }
      rect(thisRect.x, thisRect.y, thisRect.w, thisRect.h, 3, 3);
      thisRect.color = fColor;
    });
  }

  drawCircles(process) {
    this.circles.forEach((thisCircle) => {
      if (dist(process.x, process.y, thisCircle.x, thisCircle.y) < thisCircle.r) {
        process.inside = true;
        if (!mouseIsPressed) {
          process.x = thisCircle.x - (process.image.width * process.scale) / 2;
          process.y = thisCircle.y - (process.image.height * process.scale) / 2;
        }
        process.inside = true;
        if (process.house === null) {
          process.house = thisCircle;
        }
      }
      if (process.house && process.house.id === thisCircle.id) {
        fill(thisCircle.color.r, thisCircle.color.g, thisCircle.color.b);
      } else {
        fill(fColor.r, fColor.g, fColor.b);
      }
      circle(thisCircle.x, thisCircle.y, thisCircle.r);
      thisCircle.color = fColor;
    });
  }

  drawLines(thing1Id, thing2Id) {
    var thing1 = this.rects.find((rect) => rect.id === thing1Id);
    if (!thing1) {
      thing1 = this.circles.find((circle) => circle.id === thing1Id);
    }
    if (!thing1) {
      thing1 = this.imageRects.find((imageRect) => imageRect.id === thing1Id);
    }

    var thing2 = this.rects.find((rect) => rect.id === thing2Id);
    if (!thing2) {
      thing2 = this.circles.find((circle) => circle.id === thing2Id);
    }
    if (!thing2) {
      thing2 = this.imageRects.find((imageRect) => imageRect.id === thing2Id);
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
      stroke(255);
      line(thing1.x + thing1.w / 2, thing1.y + thing1.h, thing2.x + thing2.w / 2, thing2.y);
      return;
    }

    if (thing1IsCircle && !thing2IsCircle && thing1IsLeft) {
      stroke(255);
      line(thing1.x + thing1.r, thing1.y, thing2.x, thing2.y + thing2.h / 2);
      return;
    }

    if (thing1IsLeft && thing1IsRect && thing2IsCircle) {
      fill(bColor.r, bColor.g, bColor.b);
      stroke(255);
      line(thing1.x + thing1.w, thing1.y + thing1.h / 2, thing2.x - thing2.r / 2, thing2.y);
    }

    if (thing1IsRight && !thing1IsRect && thing2IsRect) {
      line(thing1.x + thing1.r / 2, thing1.y, thing2.x, thing2.y + (thing2.h / 2) * thing2.scale);
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
        if (mouseIsPressed && !this.someIsSelected) {
          process.selected = true;
        } else {
          process.selected = false;
        }
      }
    });
    this.processes.forEach((process) => {
      if (!process.inside && !mouseIsPressed) {
        process.x = process.defaultX;
        process.y = process.defaultY;
      }

      if (process.house) {
        // if (!mouseIsPressed) {
        fill(process.color.r, process.color.g, process.color.b);
        // }
        if (process.house.r) {
          process.draw = true;
          circle(process.house.x, process.house.y, process.house.r);
          process.house.process = process;
        } else {
          rect(process.house.x, process.house.y, process.house.w, process.house.h, 3, 3);
          process.house.process = process;
        }
      }
      image(process.image, process.x, process.y, process.image.width * process.scale, process.image.height * process.scale);
    });
  }

  draw() {
    if (!mouseIsPressed) {
      this.someIsSelected = false;
      this.selectedId = "";
    }
    this.processes.forEach((process) => {
      if (
        mouseX > process.x - process.image.width * process.scale &&
        mouseX < process.x + process.image.width * process.scale &&
        mouseY > process.y - process.image.height * process.scale &&
        mouseY < process.y + process.image.height * process.scale
      ) {
        cursor(HAND);
        process.house = null;
        if (mouseIsPressed && !this.someIsSelected) {
          process.selected = true;
          this.someIsSelected = true;
          this.selectedId = process.id;
          process.x = mouseX;
          process.y = mouseY;
        } else if (mouseIsPressed && this.selectedId === process.id) {
          process.x = mouseX;
          process.y = mouseY;
        } else {
          process.selected = false;
        }
      } else {
        process.selected = false;
      }
      process.inside = false;

      this.drawRects(process);
      this.drawCircles(process);
    });

    this.hackRects.forEach((hackRect) => {
      this.drawHackRects(hackRect);
    });

    this.lines.forEach((line) => {
      this.drawLines(line.thing1, line.thing2);
    });

    this.drawImageRects();
    this.drawProcesses();
  }
}
