"use strict";

class Route {

  constructor(nodeSequence) {
    this.nodeSequence = nodeSequence;
  }

  cost() {
    var c = 0;
    for (var idx = 1; idx < this.nodeSequence.length; ++idx) {
      var edge = edgeMatrix[this.nodeSequence[idx - 1].label][this.nodeSequence[idx].label];
      c += edge.cost();
    }
    return c;
  }

  expectedCost() {
    var c = edgeMatrix[nodeZero.label][this.nodeSequence[1].label].cost();
    var probNotFound = 1;
    for (var idx = 1; idx < this.nodeSequence.length - 1; ++idx) {
      var currentNode = this.nodeSequence[idx];
      var edgeToNext = edgeMatrix[currentNode.label][this.nodeSequence[idx + 1].label];
      var edgeToZero = edgeMatrix[currentNode.label][nodeZero.label];
      var probFound = currentNode.p / probNotFound;
      var probNotFoundSoFar = probNotFound;
      probNotFound -= currentNode.p;
      c += edgeToNext.cost() * probNotFound + edgeToZero.cost() * probNotFoundSoFar * probFound;
    }
    return c;
  }

  expectedCostNoReturn() {
    var c = edgeMatrix[nodeZero.label][this.nodeSequence[1].label].cost();
    var probNotFound = 1;
    for (var idx = 1; idx < this.nodeSequence.length - 2; ++idx) {
      var currentNode = this.nodeSequence[idx];
      var edgeToNext = edgeMatrix[currentNode.label][this.nodeSequence[idx + 1].label];
      var edgeToZero = edgeMatrix[currentNode.label][nodeZero.label];
      var probFound = currentNode.p / probNotFound;
      var probNotFoundSoFar = probNotFound;
      probNotFound -= currentNode.p;
      c += edgeToNext.cost() * probNotFound + edgeToZero.cost() * probNotFoundSoFar * probFound;
    }
    return c;
  }

  draw(rowLabel, minCost, minExpectedCost, minExpectedCostNoReturn, x, y) {
    fill(0);
    noStroke();
    textStyle(NORMAL);
    var label = rowLabel + '. ';
    text(label, x, y);
    this.cost() <= minCost ? fill(255, 100, 100) : fill(0);
    text(this.cost().toFixed(0), x + 40, y);
    this.expectedCost() <= minExpectedCost ? fill(255, 100, 100) : fill(0);
    text(this.expectedCost().toFixed(0), x+80, y);
    this.expectedCostNoReturn() <= minExpectedCostNoReturn ? fill(255, 100, 100) : fill(0);
    text(this.expectedCostNoReturn().toFixed(0), x+140, y);
    text(this.nodeSequence.toString(), x+200, y);
  }

  drawHeader(x, y) {
    fill(0);
    noStroke();
    textStyle(BOLD);
    text('row', x, y);
    text('cost', x+30, y);
    text('E[c]', x+80, y);
    text('E[c](no ret)', x+125, y);
    text('sequence', x+210, y);
  }

}