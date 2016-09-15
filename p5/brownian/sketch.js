"use strict";

var needsRedraw = true;
var cnv;

function setup() {
  centerCanvas();
  noFill();
  frameRate(10);
}

function draw() {
  translate(0, height * 0.5);
  translate(1, -1);
  var xStep = 2;
  var vol = height * 0.01;
  var y = 0;
  var grayLevel = 192 + random() * 64;
  stroke(grayLevel, grayLevel, grayLevel, 100);
  beginShape();
  for (var x = 0; x < width; x += xStep) {
    vertex(x, y);
    y += randomGaussian() * vol;
  }
  endShape();
}

function centerCanvas() {
  cnv = createCanvas(windowWidth - 40 , windowHeight - 40);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(240);
}

function windowResized() {
  centerCanvas();
}