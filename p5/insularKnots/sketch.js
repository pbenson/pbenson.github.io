"use strict";

var tileSizeInPixels = 72;
var x = 0,
  y = 0;
let blank, corner, straight, drop_right_under, drop_right_over, drop_left, drop_left_under, drop_left_over, diagonal;
let tileImages;
let rows = 12;
let cols = 20;
let tileIndices;
let tileRotations;
let designJSON;

function preload() {
  designJSON = loadJSON('design.json', designJSON);
}

function setup() {
  createCanvas(800, 800);
  corner = loadImage('assets/corner.jpg');
  straight = loadImage('assets/straight.jpg');
  drop_right_under = loadImage('assets/drop_right_under.jpg');
  drop_right_over = loadImage('assets/drop_right_over.jpg');
  drop_left_under = loadImage('assets/drop_left_under.jpg');
  drop_left_over = loadImage('assets/drop_left_over.jpg');
  diagonal = loadImage('assets/diagonal.jpg');
  blank = loadImage('assets/blank.jpg');
  tileImages = [blank, corner, straight, drop_right_under, drop_right_over, drop_left_under, drop_left_over, diagonal];
  tileIndices = designJSON.tileIndices;
  tileRotations = designJSON.tileRotations;
}

function drawKnotsOnly() {
  clear();
  for (var r = 0; r < rows; ++r) {
    for (var c = 0; c < cols; ++c) {
      push();
      translate((c + 0.5) * tileSizeInPixels, (r + 0.5) * tileSizeInPixels);
      rotate(PI / 2 * tileRotations[r][c]);
      imageMode(CENTER);
      image(tileImages[tileIndices[r][c]], 0, 0, tileSizeInPixels, tileSizeInPixels);
      pop();
    }
  }
}

function draw() {
  drawKnotsOnly();

  //draw frame around current cell
  stroke(255, 0, 0);
  noFill();
  rect(column() * tileSizeInPixels, row() * tileSizeInPixels, tileSizeInPixels, tileSizeInPixels);


  fill(255, 0, 0);
  noStroke();
  var msg = "Click cell to change tile, type 'r' to rotate, 's' to save, 'c' to clear."
  text(msg, (width - textWidth(msg)) / 2, 20);
}

function mousePressed() {
  if (mouseInBounds()) {
    tileIndices[row()][column()] = (tileIndices[row()][column()] + 1) % tileImages.length;
  }
}

function column() {
  return int(mouseX / tileSizeInPixels);
}

function row() {
  return int(mouseY / tileSizeInPixels);
}

function mouseInBounds() {
  return column() < cols || row() < rows;
}


function keyTyped() {
  if (key == 's') {
    var sizeScalar = 1;
    createCanvas(width * sizeScalar, height * sizeScalar);
    noSmooth();
    drawKnotsOnly();
    var filename = 'insularTiles_' + frameCount + '.jpg';
    save(filename);

    designJSON = {};
    designJSON.tileIndices = tileIndices;
    designJSON.tileRotations = tileRotations;
    saveJSON(designJSON, 'design_' + frameCount + '.json');
    createCanvas(width / sizeScalar, height / sizeScalar);
  } else if (key == 'c') {
    for (var r = 0; r < rows; ++r) {
      for (var c = 0; c < cols; ++c) {
        tileIndices[r][c] = 0;
        tileRotations[r][c] = 0;
      }
    }
  }

  if (!mouseInBounds()) {
    return;
  }
  if (key == 'r') {
    tileRotations[row()][column()] = (tileRotations[row()][column()] + 1) % 4;
    needsRedraw = true;
  }

}
