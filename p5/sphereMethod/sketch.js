"use strict";

var pixPerUnit = 100.0;
var markerDiameter = 5.0 / pixPerUnit;
var xMax, yMax;
var largestBallCenterSelected = false;
var constraintSet = new ConstraintSet();
var objectiveFunction, largestBall;

function setup() {
  createCanvas(800, 800);

  constraintSet.addConstraint(-1, -1, -3);
  constraintSet.addConstraint(2, -1, -5);
  constraintSet.addConstraint(-1, 2, -5);
  constraintSet.addConstraint(1, 2, -3);

  objectiveFunction = new FacetalHyperplane(-1, 5, 0);

  largestBall = new Sphere();
}

function draw() {
  if (frameCount > 1) {
    if (mouseX == pmouseX && mouseY == pmouseY) {
      //nothing going on
      return;
    }
  }
  background(255);
  translate(width * 0.5, height * 0.5);
  scale(pixPerUnit, -pixPerUnit);

  xMax = float(width) / pixPerUnit;
  yMax = float(height) / pixPerUnit;

  constraintSet.draw();

  if (!largestBallCenterSelected) {
    largestBall.moveCenterToMouse();
  }

  if (largestBall.centerIsFeasible()) {
    noFill();
    stroke(1);

    largestBall.draw();

    //draw objective hyperplane
    var objTouchPoint = largestBall.objectiveTouchPoint();
    objectiveFunction.fitTo(objTouchPoint.x, objTouchPoint.y);
    stroke(0, 192, 0);
    strokeWeight(2.0 / pixPerUnit);
    objectiveFunction.drawPlane();

    //draw objective Touch point
    stroke(255, 0, 0);
    ellipse(objTouchPoint.x, objTouchPoint.y, markerDiameter, markerDiameter);

    //draw Touch Point(s), and LineSegments from TouchPoint throught largestBall center to facetal hyperplanes
    stroke(0, 0, 200);
    var points = largestBall.touchPoints();
    for (var ptIndex = 0; ptIndex < points.length; ++ptIndex) {
      var pt = points[ptIndex];
      ellipse(pt.x, pt.y, markerDiameter, markerDiameter);
      var seg = new LineSegment(pt.x, pt.y, objTouchPoint.x, objTouchPoint.y);
      seg.drawToFirstConstraint().draw();
    }

    //not in algorithm, but why not use line from center of Ball?
    stroke(255, 128, 0);
    new LineSegment(largestBall.x, largestBall.y, objTouchPoint.x, objTouchPoint.y).drawToFirstConstraint().draw();

  }
}

function mousePressed() {
  if (largestBallCenterSelected) {
    largestBallCenterSelected = false;
    return;
  }
  largestBall.moveCenterToMouse();
  largestBallCenterSelected = largestBall.centerIsFeasible();
}

function mouseToX() {
  return (mouseX - width * 0.5) / pixPerUnit;
}

function mouseToY() {
  return (height * 0.5 - mouseY) / pixPerUnit;
}