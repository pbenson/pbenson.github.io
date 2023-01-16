"use strict"

var nodeDiameter;
var nodes;
var nodeZero;
var edges;
var edgeMatrix;
var textHeight = 16;
var numberNodes = 6;
var needsRedraw = true;
var params;
var numberNodesDropdown;

function setup() {
  createCanvas(1280, 640);
  nodeDiameter = min(width, height) * 0.1;
  params = getURLParams();
  // console.log(params);
  if (params.n) {
    numberNodes = max(3, min(int(params.n), 8));
  }
  numberNodesDropdown = makeDropdownMenu([3, 4, 5, 6, 7, 8], numberNodesChanged, 120, 10);
  numberNodesDropdown.value(numberNodes);
  createNodes(numberNodes);
}

function numberNodesChanged() {
  numberNodes = int(numberNodesDropdown.value());
  // createNodes(numberNodes);
  // needsRedraw = true;
  window.location.href = '.?n='+numberNodes
}

function ease(x0, x1, easing) {
  return x0 * easing + x1 * (1.0 - easing);
}

function formatFloat(f) {
  return f.toFixed(2);
}

function createNodes(numberNodes) {
  nodes = [];
  var radiusOnPage = min(width, height) * 0.35;
  nodeZero = new Node(0, radiusOnPage, 0, 0);
  nodes.push(nodeZero);
  var p = 1.0 / (numberNodes - 1);
  for (var nodeCtr = 1; nodeCtr < numberNodes; ++nodeCtr) {
    var angle = TWO_PI * nodeCtr / numberNodes;
    nodes.push(new Node(nodeCtr, radiusOnPage * cos(angle), radiusOnPage * sin(angle), p));
  }
  createEdges();
}

function createEdges() {
  edges = [];
  edgeMatrix = new Array(nodes.length);
  for (var nodeCtr = 0; nodeCtr < nodes.length; ++nodeCtr) {
    edgeMatrix[nodeCtr] = new Array(nodes.length);
  }
  for (var nodeCtr0 = 0; nodeCtr0 < nodes.length; ++nodeCtr0) {
    var node0 = nodes[nodeCtr0];
    for (var nodeCtr1 = nodeCtr0 + 1; nodeCtr1 < nodes.length; ++nodeCtr1) {
      var newEdge = new Edge(node0, nodes[nodeCtr1], 1 + int(random() * 2 * nodes.length))
      edges.push(newEdge);
      edgeMatrix[nodeCtr0][nodeCtr1] = newEdge;
      edgeMatrix[nodeCtr1][nodeCtr0] = newEdge;
    }
  }
}

function draw() {
  if (!needsRedraw) {
    return;
  }
  needsRedraw = false;

  //draw network
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Number of nodes ", 10, 6 + textHeight)
  push();
  translate(width * 0.25, height * 0.5);
  for (var i = 0; i < edges.length; i++) {
    edges[i].draw();
  }
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }
  pop();

  //build list of all routes...
  var nodeSequences = allSequences(nodes.slice(1));
  var routes = [];
  for (var idx = 0; idx < nodeSequences.length; ++idx) {
    var nodeSequence = [nodeZero].concat(nodeSequences[idx]).concat([nodeZero]);
    routes.push(new Route(nodeSequence));
  }
  routes.sort(function(a, b) {
    return a.expectedCost() - b.expectedCost();
  });
  var minExpectedCost = routes[0].expectedCost();
  routes.sort(function(a, b) {
    return a.cost() - b.cost();
  });
  var minCost = routes[0].cost();
  translate(width * 0.55, textHeight * 3);
  routes[0].drawHeader();
  for (var idx = 0; idx < routes.length; ++idx) {
    var route = routes[idx];
    if (route.cost() <= minCost || route.expectedCost() <= minExpectedCost) {
      translate(0, textHeight * 1.2);
      route.draw(idx + 1, minCost, minExpectedCost);
    }
  }
}

function allSequences(array) {
  // console.log("in allSequences: " );
  if (array.length == 1) {
    return [array];
  }
  var all = [];
  for (var idx = 0; idx < array.length; ++idx) {
    var subArray = array.slice(0);
    subArray.splice(idx, 1);
    var allSubarraySequences = allSequences(subArray);
    for (var subSeqIndex = 0; subSeqIndex < allSubarraySequences.length; ++subSeqIndex) {
      var subSeq = allSubarraySequences[subSeqIndex];
      var newSeq = [array[idx]].concat(subSeq);
      all.push(newSeq);
    }
  }
  return all;
}