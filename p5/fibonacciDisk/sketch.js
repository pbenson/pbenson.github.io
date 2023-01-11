"use strict";

var needsRedraw = true;
var phi = (1 + Math.sqrt(5)) / 2;
var dThetaSlider, scaleSlider;

function setup() {
  createCanvas(520, 640);
  var goldenAngle = 2 * PI * (1 - 1 / phi);
  dThetaSlider = makeSlider("angle", 0.5, 6.28, goldenAngle, 60, 20, 0.001);
  scaleSlider = makeSlider("scale", 3, 50, 10, 60, 50, 1);
}

function draw() {
  if (!needsRedraw) {
    return;
  }
  needsRedraw = false;
  push();
  background(255);
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(127);

  var dTheta = dThetaSlider.value();
  var theta = dTheta / 2;
  var x, y;
  var r;
  fill(0);
  var radiusScale = scaleSlider.value();
  var diameter = 1.5 * sqrt(radiusScale);
  while ((r = sqrt(theta) * radiusScale) < width * 0.48) {
    x = r * cos(theta);
    y = r * sin(theta);
    ellipse(r * cos(theta), r * sin(theta), diameter, diameter);
    theta += dTheta;
  }
  pop();
  noFill();
  text(dTheta, 275, 33);
  text(radiusScale, 275, 63);
}