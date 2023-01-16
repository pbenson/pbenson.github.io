"use strict";

var pixPerUnit = 100.0;
var markerDiameter = 5.0 / pixPerUnit;
var xMax, yMax;
var largestBallIsFixed = false;
var constraintSet = new ConstraintSet();
var objectiveFunction, largestBall;
var epsilonSlider;
var needsRedraw = true;

function setup() {
  centerCanvas();

  constraintSet.addConstraint(-1, -1, -3);
  constraintSet.addConstraint(2, -1, -5);
  constraintSet.addConstraint(-1, 2, -5);
  constraintSet.addConstraint(1, 2, -3);

  objectiveFunction = new FacetalHyperplane(-1, 5, 0);

  largestBall = new Sphere();

  //UI
  var sliderInset = 80;
  epsilonSlider = makeSlider("epsilon", 0, 1, 0.2, sliderInset, 20, 100, 0.01);
}

function draw() {
  if (!needsRedraw && mouseX == pmouseX && mouseY == pmouseY) {
    //nothing going on
    return;
  }
  needsRedraw = false;
  push();
  background(255);
  translate(width * 0.5, height * 0.5);
  scale(pixPerUnit, -pixPerUnit);

  xMax = float(width) / pixPerUnit;
  yMax = float(height) / pixPerUnit;

  constraintSet.draw();

  if (!largestBallIsFixed) {
    largestBall.moveCenterToMouse();
  }

  if (largestBall.centerIsFeasible()) {
    noFill();
    
    stroke(0,128);
    largestBallIsFixed ? strokeWeight(3.0/pixPerUnit ) : strokeWeight(0.5/pixPerUnit );
    largestBall.draw();
    var objTouchPoint = largestBall.drawObjectiveHyperplane();

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
      var intersectPt = seg.drawToFirstConstraint();
      if (null != intersectPt) {
        intersectPt.draw();
        //find and draw pt on line from constraint touch point through sphere min point
        var segFromOFToBoundary = new LineSegment(objTouchPoint.x, objTouchPoint.y, intersectPt.x, intersectPt.y);
        var newBallCenter = segFromOFToBoundary.interpolated(1 - epsilonSlider.value());
        newBallCenter.draw();
        var newBall = new Sphere();
        newBall.moveCenterToPoint(newBallCenter);
        newBall.draw();
        var objTouchPoint = newBall.drawObjectiveHyperplane();

        //draw projection lines from touch point to objective function
        stroke(255, 0, 0, 100);
        pt.drawProjectionLineToObjectiveFunction();
        intersectPt.drawProjectionLineToObjectiveFunction();
      }
    }
  }
  pop();

  //UI values and help text
  noStroke();
  fill(128);
  var textInset = 200;
  var yOffset = 3;
  var yRowHeight = 30
  text(epsilonSlider.value(), textInset, 1 * yRowHeight + yOffset);
  var tip = 'Move mouse in feasible (white) region. Click mouse to fix/unfix the center of ball.';
  text(tip, (width - textWidth(tip)) / 2, 15);

}

function mousePressed() {
  if (!constraintSet.isFeasible(mouseToX(), mouseToY())) {
    return;
  }
  needsRedraw = true;
  if (largestBallIsFixed) {
    largestBallIsFixed = false;
    return;
  }
  largestBall.moveCenterToMouse();
  largestBallIsFixed = largestBall.centerIsFeasible();
}

function mouseToX() {
  return (mouseX - width * 0.5) / pixPerUnit;
}

function mouseToY() {
  return (height * 0.5 - mouseY) / pixPerUnit;
}


function centerCanvas() {
  var cnv = createCanvas(windowWidth, windowHeight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
}

function windowResized() {
  centerCanvas();
}