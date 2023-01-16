"use strict";

// TODO: add pause checkbox, speed slider, left/right bias,
// solve bug of disappearing widgetson resize

var balls = [];
var ballDropIntervalMillis = 30;
var lastBallDropTimeMillis;
var accelerationPerFrame = .3;
var vBounceX = 0.68;
var vBounceY = -2;
var binCount = [];
var totalBallCount = 0;
var probabilityOfGoingRight = 0.5;

// UI
var numberOfBallsMenu, numberRowsMenu, pauseButton, resetButton;
var isPaused = true;
var needsRedraw = true;

function setup() {
  // numberRowsSlider = {
  //   value: function() {
  //     return 12;
  //   }
  // }
  reset();
}

function reset() {
  centerCanvas();
  numberOfRowsChanged();
  isPaused = true;
}

function numRows() {
  if (numberRowsMenu) {
    return int(numberRowsMenu.value());
  }
  return 12;
}

function numberOfRowsChanged() {
  binCount = [];
  balls = [];
  for (var i = 0; i <= numRows(); ++i) {
    binCount.push(0);
  }
  lastBallDropTimeMillis = millis();
  totalBallCount = 0;
  forceRedraw();
}

function draw() {
  if (isPaused) {
    return;
  }
  background(255);
  push();
  var pinDiameter = pinSeparation() * 0.1;
  noStroke();
  fill(0, 0, 255);
  translate(width / 2, topPinHeight());
  //draw pins
  for (var r = 0; r < numRows(); ++r) {
    for (var pin = 0; pin <= r; ++pin) {
      ellipse((-(r) * 0.5 + pin) * pinSeparation(), r * rowSeparation(), pinDiameter, pinDiameter);
    }
  }

  //make sure balls are dropping at specified rate
  var timeNowMillis = millis();
  var ballsToAdd = (int)((timeNowMillis - lastBallDropTimeMillis) / ballDropIntervalMillis);
  ballsToAdd = min(10, ballsToAdd);
  ballsToAdd = max(0, min(ballsToAdd, numberOfBallsMenu.value() - totalBallCount));
  totalBallCount += ballsToAdd;
  if (ballsToAdd > 0) {
    for (var i = 0; i < ballsToAdd; ++i) {
      balls.push(new Ball());
    }
    lastBallDropTimeMillis = timeNowMillis;
  }

  //select balls that have dropped off screen
  var ballsRemaining = [];
  for (var ballIndex = 0; ballIndex < balls.length; ++ballIndex) {
    var ball = balls[ballIndex];
    if (ball.allDone()) {
      binCount[ball.bin] += 1;
    } else {
      ball.draw();
      ballsRemaining.push(ball);
    }
  }
  balls = ballsRemaining;
  pop();

  //draw histogram
  fill(0);
  noStroke();
  var heightScalar = (height - topPinHeight() - numRows() * rowSeparation()) / max(binCount);
  if (heightScalar > 1)
    heightScalar = 1;
  var pinSpan = pinSeparation() * (numRows() + 1);
  var xShift = (width - pinSpan) * 0.5;
  for (var i = 0; i < binCount.length; ++i) {
    var barHeight = heightScalar * binCount[i];
    var x = xShift + i * pinSeparation();
    var y = height - barHeight;
    rect(x, y, pinSeparation(), barHeight);
    var label = "" + binCount[i];
    text("" + binCount[i], x + (pinSeparation() - textWidth(label)) * 0.5, y - 2);
  }
}

function pinSeparation() {
  return 30.0;
}

function rowSeparation() {
  return pinSeparation() * sqrt(3) * 0.5;
}

function topPinHeight() {
  return height / 6.0;
}

class Ball {
  constructor() {
    this.x = 0;
    this.y = -topPinHeight() * (0.7 + random(0.3));
    this.vx = 0;
    this.vy = 0;
    this.currentRow = -1;
    this.bin = 0;
  }

  draw() {
    var row = (int)(this.y / rowSeparation());
    if (row >= numRows()) {
      this.vx = 0;
    } else
    if (row > this.currentRow) {
      if (this.currentRow == -1) {
        this.currentRow = 0;
        this.y = 0;
      } else {
        this.currentRow = row;
      }
      //bounce
      this.vx = (random(1) > probabilityOfGoingRight) ? abs(vBounceX) : -abs(vBounceX);
      if (this.vx > 0) ++this.bin;
      this.vy = vBounceY;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vy += accelerationPerFrame;
    var ballDiameter = 6;
    stroke(255, 0, 0);
    ellipse(this.x, this.y, ballDiameter, ballDiameter);
  }

  allDone() {
    return this.y > height;
  }
}

function centerCanvas() {
  var cnv = createCanvas(windowWidth, windowHeight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
  numberRowsMenu = makeRangeSelectMenu("Number of rows: ", 1, 25, numRows(), 10, 20);
  numberRowsMenu.input(numberOfRowsChanged);

  //number of balls
  numberOfBallsMenu = makeSelectMenu('Number of balls: ', [1, 10, 100, 1000, 10000], 10, 50);

  //pause button
  function togglePaused() {
    isPaused = !isPaused;
    if (pauseButton) {
      pauseButton.html(isPaused ? "resume" : "pause");
    }
  }
  pauseButton = makeButton("start", 10, 80, togglePaused);
  resetButton = makeButton("reset", 10, 100, reset);
}

function windowResized() {
  centerCanvas();
}
