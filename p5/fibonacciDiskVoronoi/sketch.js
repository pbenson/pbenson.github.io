"use strict";

var needsRedraw = true;
var phi = (1 + Math.sqrt(5)) / 2;
var dThetaSlider, scaleSlider, penWidthSlider, heightSlider;

//Voronoi
var voronoi, bbox, sites;
var vorWidth = 1000;
var vorHeight = 1000;

function setup() {
  createCanvas(520, 520);
  const goldenAngle = 2 * PI * (1 - 1 / phi);
  const sliderInset = 120;
  const sliderWidth = 350;
  dThetaSlider = makeSlider("angle", 0.25, 6.28, goldenAngle, sliderInset, 20, sliderWidth, 0.001);
  scaleSlider = makeSlider("distance scaling", 10, 50, 10, sliderInset, 50, sliderWidth, 1);
}

function drawDiskOnly() {
  noSmooth();
  strokeWeight(1);
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
  var diameter = 2;
  //draw points
  while ((r = sqrt(theta) * radiusScale) < vorWidth * 0.48) {
    var pt = {
      x: vorWidth / 2 + r * cos(theta),
      y: vorHeight / 2 + r * sin(theta)
    };
    sites.push(pt);
    theta += dTheta;
  }

  //draw Voronoi
  var diagram = voronoi.compute(sites, bbox);
  for (var cellIndex in diagram.cells) {
    var cell = diagram.cells[cellIndex];
    if (includeInDrawing(cell)) {
       ellipse(cell.site.x* width / vorWidth, cell.site.y* height / vorHeight, diameter, diameter);
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

  noStroke();
  fill(0);
  text(dThetaSlider.value(), 480, 33);
  text(scaleSlider.value(), 480, 63);
}

function keyTyped() {

}


function includeInDrawing(cell) {
  var maxRadius = vorHeight * 0.48;
  for (var edgeIndex in cell.halfedges) {
    var edge = cell.halfedges[edgeIndex].edge;
    var yScale = 1.0;
    if (dist(edge.va.x - vorWidth / 2, (edge.va.y -  vorHeight / 2) * yScale, 0, 0) > maxRadius) {
      return false;
    }
    if (dist(edge.vb.x - vorWidth / 2,  (edge.vb.y -  vorHeight / 2), 0, 0) > maxRadius) {
      return false;
    }
  }
  return true;
}