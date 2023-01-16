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
var showOptimaOnlyCheckbox;

function setup() {
  createCanvas(1280, 640);
  nodeDiameter = min(width, height) * 0.1;
  params = getURLParams();
  var showOptima = true;
  if (params.n) {
    numberNodes = max(3, min(int(params.n), 7));
  }
  if (params.optima) {
    showOptima = (params.optima == 'true');
  }
  numberNodesDropdown = makeDropdownMenu([3, 4, 5, 6, 7], numberNodesChanged, 120, 10);
  numberNodesDropdown.value(numberNodes);
  showOptimaOnlyCheckbox = makeCheckbox('Show optimal routes only', showOptima, 20, 40, showOptimaChanged);
  createNodes(numberNodes);
}

function numberNodesChanged() {
  numberNodes = int(numberNodesDropdown.value());
  updateURL();
}

function showOptimaChanged() {
  updateURL();
  forceRedraw();
}

function updateURL() {
  window.location.href = '.?n=' + numberNodes + '&optima='+showOptimaOnlyCheckbox.checked()
}

function ease(x0, x1, easing) {
  return x0 * easing + x1 * (1.0 - easing);
}

function createNodes(numberNodes) {
  nodes = [];
  var xMid = width * 0.25;
  var yMid = height * 0.5;
  var radiusOnPage = min(width, height) * 0.35;
  nodeZero = new Node(0, xMid + radiusOnPage, yMid, 0);
  nodes.push(nodeZero);
  var p = 1.0 / (numberNodes - 1);
  for (var nodeCtr = 1; nodeCtr < numberNodes; ++nodeCtr) {
    var angle = TWO_PI * nodeCtr / numberNodes;
    nodes.push(new Node(nodeCtr, xMid + radiusOnPage * cos(angle), yMid - radiusOnPage * sin(angle), p));
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
      var newEdge = new Edge(node0, nodes[nodeCtr1])
      edges.push(newEdge);
      edgeMatrix[nodeCtr0][nodeCtr1] = newEdge;
      edgeMatrix[nodeCtr1][nodeCtr0] = newEdge;
    }
  }
}

function draw() {
  if (!mouseIsPressed) {
    if (!needsRedraw) {
      return;
    }
    needsRedraw = false;
  }
  //draw network
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Number of nodes ", 10, 6 + textHeight)
  // translate(width * 0.25, height * 0.5);
  for (var i = 0; i < edges.length; i++) {
    edges[i].draw();
  }
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }

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
    return a.expectedCostNoReturn() - b.expectedCostNoReturn();
  });
  var minExpectedCostNoReturn = routes[0].expectedCostNoReturn();
  routes.sort(function(a, b) {
    return a.cost() - b.cost();
  });
  var minCost = routes[0].cost();
  var xRouteText = width * 0.55;
  var yRouteText = 20;
  var showAll = ! showOptimaOnlyCheckbox.checked();
  routes[0].drawHeader(xRouteText, yRouteText);
  for (var idx = 0; idx < routes.length; ++idx) {
    var route = routes[idx];
    if (showAll || route.cost() <= minCost || route.expectedCost() <= minExpectedCost) {
      yRouteText += textHeight * 1.2;
      route.draw(idx + 1, minCost, minExpectedCost, minExpectedCostNoReturn,xRouteText, yRouteText);
    }
  }
}

function mousePressed() {
  needsRedraw = true;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].dragIfSelected())
      return;
  }
}

function mouseReleased() {
  needsRedraw = true;
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].releaseDrag();
  }
}


function allSequences(array) {
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