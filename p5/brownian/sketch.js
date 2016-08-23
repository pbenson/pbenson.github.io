"use strict";

var needsRedraw = true;

function setup() {
  createCanvas(1024, 256);
  background(230);
  noFill();
  frameRate(10);
}

function draw() {
  translate(0, height * 0.5);
  translate(1, -1);
  var xStep = 2;
  var vol = 2;
  var y = 0;
  var grayLevel =  random() * 256;
  stroke(grayLevel, grayLevel, grayLevel, 100);
  beginShape();
  for (var x = 0; x < width; x += xStep) {
    vertex(x, y);
    y += randomGaussian() * vol;
  }
  endShape();
}