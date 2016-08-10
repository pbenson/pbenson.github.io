"use strict";

var needsRedraw = true;
var phi = (1 + Math.sqrt(5)) / 2;
var dThetaSlider, scaleSlider, penWidthSlider;

//Voronoi
var voronoi, bbox, sites;
var vorWidth = 1000;
var vorHeight = 1000;

function setup() {
  createCanvas(1000, 1000);
  var goldenAngle = 2 * PI * (1 - 1 / phi);
  var sliderInset = 70;
  dThetaSlider = makeSlider("angle", 0.25, 6.28, goldenAngle, sliderInset, 20, 0.001);
  scaleSlider = makeSlider("scale", 3, 50, 10, sliderInset, 50, 1);
  penWidthSlider = makeSlider("pen size", 1, 40, 0.5, sliderInset, 80, 0.5);
}

function drawDiskOnly() {
  noSmooth();
  strokeWeight(penWidthSlider.value() * width / vorWidth);
  needsRedraw = false;
  voronoi = new Voronoi();
  bbox = {
    xl: 0,
    xr: vorWidth,
    yt: 0,
    yb: vorHeight
  };
  sites = [];

  push();
  background(255);
  stroke(0);

  var dTheta = dThetaSlider.value();
  var theta = dTheta / 2;
  var x, y;
  var r;
  fill(0);
  var radiusScale = scaleSlider.value();
  var diameter = 1.5 * sqrt(radiusScale);
  //draw points
  while ((r = sqrt(theta) * radiusScale) < vorWidth * 0.48) {
    var pt = {
      x: vorWidth / 2 + r * cos(theta),
      y: vorHeight / 2 + r * sin(theta)
    };
    sites.push(pt);
    // ellipse(pt.x, pt.y, diameter, diameter);
    theta += dTheta;
  }

  //draw Voronoi
  var diagram = voronoi.compute(sites, bbox);
  for (var cellIndex in diagram.cells) {
    var cell = diagram.cells[cellIndex];
    // println(cell);
    if (includeInDrawing(cell)) {
      for (var edgeIndex in cell.halfedges) {
        var edge = cell.halfedges[edgeIndex].edge;
        line(edge.va.x * width / vorWidth, edge.va.y * height / vorHeight, edge.vb.x * width / vorWidth, edge.vb.y * height / vorHeight);
      }
    }
  }
  pop();
}

function draw() {
  if (!needsRedraw) {
    return;
  }
  drawDiskOnly();

  smooth();
  strokeWeight(1);
  fill(255,0,0);
  var tip = 'Type \'s\' to save, + to increase angle, - to decrease angle.';
  text(tip, (width - textWidth(tip)) / 2, 15);
  text(dThetaSlider.value(), 290, 33);
  text(scaleSlider.value(), 290, 63);
  text(penWidthSlider.value(), 290, 93);
}

function keyTyped() {
  if (key == 's') {
    drawDiskOnly();
    var filename = 'fibDisk' + Math.round(dThetaSlider.value() * 100) + 'a_' + scaleSlider.value() + 's_' + penWidthSlider.value() + 'p.png';
    save(filename);
  } else if (key == '+') {
    dThetaSlider.value(dThetaSlider.value() + 0.001);
  } else if (key == '-') {
    dThetaSlider.value(dThetaSlider.value() - 0.001);
  }
  needsRedraw = true;
}


function includeInDrawing(cell) {
  var maxRadius = vorHeight * 0.48;
  for (var edgeIndex in cell.halfedges) {
    var edge = cell.halfedges[edgeIndex].edge;
    // println(edge);
    if (dist(edge.va.x, edge.va.y, vorWidth / 2, vorHeight / 2) > maxRadius) {
      return false;
    }
    if (dist(edge.vb.x, edge.vb.y, vorWidth / 2, vorHeight / 2) > maxRadius) {
      return false;
    }
  }
  return true;
}