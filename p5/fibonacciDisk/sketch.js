"use strict";

var needsRedraw = true;
var phi = (1 + Math.sqrt(5)) / 2;
var dThetaSlider, scaleSlider;

function setup() {
  createCanvas(520, 640);
  const goldenAngle = 2 * PI * (1 - 1 / phi);
  const sliderInset = 120;
  const sliderWidth = 360;
  dThetaSlider = makeSlider("angle", 0.25, 6.28, goldenAngle, sliderInset, 20, sliderWidth, 0.001);
  scaleSlider = makeSlider("distance scaling", 10, 50, 10, sliderInset, 50, sliderWidth, 1);
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
  fill(0);
  text(dTheta, 485, 33);
  text(radiusScale, 485, 63);
}