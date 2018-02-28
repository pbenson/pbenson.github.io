var x = 0,
  y = 0;
var xMin = -2.1820;
var xMax = 2.6558;
var yMin = 0;
var yMax = 9.9983;
var xScale, yScale;

var ITERATIONS_PER_FRAME = 1000;

function f1(x_n, y_n) {
  return {
    x: 0,
    y: 0.16 * y_n
  }
}

function f2(x_n, y_n) {
  return {
    x: 0.85 * x_n + 0.04 * y_n,
    y: -0.04 * x_n + 0.85 * y_n + 1.6
  }
}

function f3(x_n, y_n) {
  return {
    x: 0.2 * x_n - 0.26 * y_n,
    y: 0.23 * x_n + 0.22 * y_n + 1.6
  }
}

function f4(x_n, y_n) {
  return {
    x: -0.15 * x_n + 0.28 * y_n,
    y: 0.26 * x_n + 0.24 * y_n + 0.44
  }
}

function setup() {
  createCanvas(600, 600);
  var shrinkFactor = 0.8;
  xScale = width / (xMax - xMin) * shrinkFactor;
  yScale = height / (yMax - yMin) * shrinkFactor ;
  // translate(width * (0 - xMin) / (xMax - xMin), height * (0 - yMin) / (yMax - yMin));
  // scale(1, -1);
  background(255);
  stroke(0);
  fill(0);
}

function draw() {
  translate(1.1 * width * (0 - xMin) / (xMax - xMin), height * 0.9);
  // translate(width * 0.5, 0);
  for (var i = 0; i < ITERATIONS_PER_FRAME; ++i) {
    point(x * xScale, - y * yScale);
    // ellipse(x * xScale, y * yScale, 2, 2);
    var r = Math.random();
    var f;
    if (r < 0.01) {
      f = f1;
    } else if (r < 0.86) {
      f = f2;
    } else if (r < 0.93) {
      f = f3;
    } else {
      f = f4;
    }
    xy = f(x, y);
    x = xy.x;
    y = xy.y;
  }
}
