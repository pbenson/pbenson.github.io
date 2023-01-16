"use strict";

class Route {

  constructor(nodeSequence) {
    this.nodeSequence = nodeSequence;
  }

  cost() {
    var c = 0;
    for (var idx = 1; idx < this.nodeSequence.length; ++idx) {
      var edge = edgeMatrix[this.nodeSequence[idx - 1].label][this.nodeSequence[idx].label];
      c += edge.cost;
    }
    return c;
  }

  expectedCost() {
    var c = edgeMatrix[nodeZero.label][this.nodeSequence[1].label].cost;
    var probNotFound = 1;
    for (var idx = 1; idx < this.nodeSequence.length - 1; ++idx) {
      var currentNode = this.nodeSequence[idx];
      var edgeToNext = edgeMatrix[currentNode.label][this.nodeSequence[idx + 1].label];
      var edgeToZero = edgeMatrix[currentNode.label][nodeZero.label];
      var probFound = currentNode.p / probNotFound;
      var probNotFoundSoFar = probNotFound;
      probNotFound -= currentNode.p;
      c += edgeToNext.cost * probNotFound + edgeToZero.cost * probNotFoundSoFar * probFound;
    }
    return c;
  }

  draw(rowLabel, minCost, minExpectedCost) {
    fill(0);
    noStroke();
    textStyle(NORMAL);
    var label = rowLabel + '. ';
    text(label, 0, 0);
    this.cost() <= minCost ? fill(255, 100, 100) : fill(0);
    text(this.cost(), 40, 0);
    this.expectedCost() <= minExpectedCost ? fill(255, 100, 100) : fill(0);
    text(formatFloat(this.expectedCost()), 80, 0);
    text(this.nodeSequence.toString(), 140, 0);
  }

  drawHeader() {
    fill(0);
    noStroke();
    textStyle(BOLD);
    text('row', 0, 0);
    text('cost', 30, 0);
    text('E[cost]', 70, 0);
    text('sequence', 135, 0);
  }

}