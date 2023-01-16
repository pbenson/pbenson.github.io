"use strict";

var needsRedraw = true;
var cnv;

function setup() {
  centerCanvas();
  noFill();
  frameRate(1);
}

function draw() {
  // push();
  noFill();
  strokeWeight(1);
  translate(0, height * 0.5);
  translate(1, -1);
  var xStep = 2;
  var vol = height * 0.01;
  var y = 0;
  var grayLevel = 128;
  var beGray = random() < 0.05 ? 0 : 1;
  stroke(grayLevel * beGray, 50);
  beginShape();
  for (var x = 0; x < width; x += xStep) {
    vertex(x, y);
    y += randomGaussian() * vol;
  }
  endShape();
  pop();
  // noStroke();
  // fill(255, 255, 255, 25);
  // rect(0,0, width, height);
}

function centerCanvas() {
  cnv = createCanvas(windowWidth - 40 , windowHeight - 40);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
}

function windowResized() {
  centerCanvas();
}
