var cellWidth = 40;

var xUser, yUser;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  var x = int(mouseX / cellWidth);
  var y = int(mouseY / cellWidth);
  if( x == xUser && y == yUser) {
    return;
  }
  xUser = x;
  yUser = y;
  background(255);
  var x1, y2;
  x1 = 5;
  y1 = 8;
  drawGrid();
  drawCell(xUser, yUser, color(127, 0, 0, 127));
  bresenColor = color(127);
  var bCoords =  bresenhamCoordinates(xUser, yUser, x1, y1);
  for (var pt of bCoords) {
    drawCell(pt.x, pt.y, color(224));
  }
  drawCell(x1, y1, color(0, 0, 127, 127));
  var msg = ""+xUser+','+yUser+" fc="+frameCount;
}

function drawCell(x, y, color_) {
  noStroke();
  fill(color_);
  rect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

function drawGrid() {
  stroke(200, 50);
  strokeWeight(1);
  for (var x = 0; x < width; x += cellWidth) {
    line(x, 0, x, height);
  }
  for (var y = 0; y < height; y += cellWidth) {
    line(0, y, width, y);
  }
}