let img;
function preload() {
  img = loadImage("cipra-full-set-4inch.png");
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  if (mouseX == pmouseX && mouseY == pmouseY) {
    return;
  }
  background(0);
  noStroke();
  rotateX((height - mouseY) * 0.5 * 0.015);
  rotateZ((mouseX - width) * 0.5 * 0.015);
  //pass image as texture
  texture(img);
  torus(120, 90, 256, 256);
}
