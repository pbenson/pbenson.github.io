var easing = 0.01;
var logoImage; // Declare variable 'img'.
var xPrevious, yPrevious;

function setup() {
  centerCanvas();
  noStroke();
  logoImage = loadImage("images/p5js.png"); // Load the image
  xPrevious = xLogoCenter();
  yPrevious = yLogoCenter();
}

function xLogoCenter() {
  return mouseX - logoImage.width / 2;
}

function yLogoCenter() {
  return mouseY - logoImage.height / 2;
}

function draw() {
  var x = xPrevious * (1 - easing) + easing * xLogoCenter();
  var y = yPrevious * (1 - easing) + easing * yLogoCenter();
  if(dist(x, y, xLogoCenter(), yLogoCenter()) < 1) {
    return;
  }
  image(logoImage, x, y);
  xPrevious = x;
  yPrevious = y;
  fill(255, 200);
  rect(0, 0, width, height);
}

function centerCanvas() {
  cnv = createCanvas(windowWidth, windowHeight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
}

function windowResized() {
  centerCanvas();
}
