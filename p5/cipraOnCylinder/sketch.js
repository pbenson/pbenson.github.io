let img;
function preload() {
  img = loadImage("cipra-full-set-4inch.png");
}

function setup() {
  createCanvas(300, 600, WEBGL);
}

function draw() {
  if (mouseX == pmouseX && mouseY == pmouseY) {
    return;
  }
  background(0);
  noStroke();
  rotateY((mouseX - width) * 0.5 * 0.03);
  texture(img);
  cylinder(80, 400, 256, 256);
}
