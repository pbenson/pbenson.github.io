"use strict";

var needsRedraw = true;
var cnv;
var framesPerSecond = 45;
var nav = [];

function draw() {
  //This is where your window gets drawn
  background(255, 25);//white out the window
  ellipse(mouseX, mouseY, 20, 20); //draw circle at location of mouse
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
  cnv = createCanvas(windowWidth - 40 , windowHeight - 40);
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
