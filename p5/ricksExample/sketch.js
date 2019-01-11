"use strict";

var needsRedraw = true;
var cnv;
var framesPerSecond = 60;
var nav = [0];
var maxNAV = 0;

function draw() {
  background(255);// white out the screen
  //This is where your window gets drawn
  translate(0, height); // bottom left
  scale(1, -1); //as y-values increase, they are plotted higher (not lower) in window
  beginShape();
  for (var i = 0; i < nav.length; i++) {
    var x = width * i / nav.length;
    var y = height * nav[i] / maxNAV;
    vertex(x, y);
  }
  endShape();

  // add another NAV observation
  var lastNAV = nav[nav.length - 1];
  var newNAV = lastNAV + random();
  nav.push(newNAV);
  if(newNAV > maxNAV) {
    maxNAV = newNAV;
  }
}

//--------------------- don't need to worry about code below

function setup() {
  centerCanvas(); //make the canvas as big as the window
  frameRate(framesPerSecond);
}

function centerCanvas() {
  //Generally, you should not need to alter this method.
  // This function creates a canvas the size of the window (adjusted for menus and controls I think)
  // windowWidth, windowHeight, width, and height are all global variables
  // updated automatically by p5.js
  cnv = createCanvas(windowWidth - 40, windowHeight - 40);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
}

function windowResized() {
  // p5.js calls this method for you whenever a window is windowResized.
  // Usually, you should not need to alter this method.
  console.log("Window resized at time " + millis())
  centerCanvas();
}
