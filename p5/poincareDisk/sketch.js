"use strict";

var u1 = 0.78, u2 = -0.58;
var diameter, radius;

function setup() {
  createCanvas(800, 800);
  diameter = width * 0.95;
  radius = diameter * 0.5;
}

function draw() {
  push();
  background(0);
  translate(width / 2, height / 2);
  noFill();
  stroke(50);
  strokeWeight(2);
  // draw edge of Poincare disk
  ellipse(0, 0, diameter, diameter);

  //draw point
  stroke(255);
  var pointSize = 6;
  fill(255);
  ellipse(u1 * radius, -u2 * radius, pointSize, pointSize);
  //mX and mY will be translated into x,y coordinates
  //as though the disk is a unit circle
  noFill();
  var v1 = mouseXToUnitDisk();
  var v2 = mouseYToUnitDisk();
  //  ellipse(v1 * radius, -v2 * radius, pointSize, pointSize);
  if (v1 * v1 + v2 * v2 < 1) {
    //draw only if mouse is in circle
    var denom = u1 * v2 - u2 * v1;
    var a = (u2 * (v1 * v1 + v2 * v2) - v2 * (u1 * u1 + u2 * u2) + u2 - v2) / denom;
    var b = (v1 * (u1 * u1 + u2 * u2) - u1 * (v1 * v1 + v2 * v2) + v1 - u1) / denom;

    var lineDiameter = sqrt(a * a / 4 + b * b / 4 - 1) * radius * 2;
    if (lineDiameter > width * 25) {
      //large diameters cause instability, so we just draw a line,
      //which is close enough.
      var dx = 100 * (mouseX - width / 2 - u1 * radius);
      var dy = 100 * (mouseY - height / 2 + u2 * radius);
      line(u1 * radius - dx, -u2 * radius - dy, mouseX - width / 2 + dx, mouseY - height / 2 + dy);
    } else {
      //circle isn't too big, so draw it
      var ctrX = -a / 2 * radius;
      var ctrY = b / 2 * radius;
      ellipse(ctrX, ctrY, lineDiameter, lineDiameter);
    }
  }
  // trim off the part of the ellipse that extends outside the disk.
  // could implement with arc, but this is so much easier.
  strokeWeight(diameter - 1);
  stroke(0);
  ellipse(0, 0, 2 * diameter, 2 * diameter);
  pop();

  let msg = "Click to fix one point. Draws Poincaré line through mouse pointer."
  fill(255);
  text(msg, (width - textWidth(msg)) / 2, 20);
}

function mouseXToUnitDisk() {
  return (mouseX - width / 2) / radius;
}

function mouseYToUnitDisk() {
  return (height / 2 - mouseY) / radius;
}

function mousePressed() {
  var u1_ = mouseXToUnitDisk();
  var u2_ = mouseYToUnitDisk();
  if (u1_ * u1_ + u2_ * u2_ < 1) {
    u1 = u1_;
    u2 = u2_;
  }
}
