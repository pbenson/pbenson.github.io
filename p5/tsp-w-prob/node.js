"use strict";

class Node {

  constructor(label, x, y, prob) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.p = prob;
  }

  draw() {
    textAlign(CENTER);
    stroke(0);
    strokeWeight(3);
    this.label == 0 ? fill(225, 255, 255) : fill(255, 255, 225);
    ellipse(this.x, this.y, nodeDiameter, nodeDiameter);
    fill(0);
    strokeWeight(1);
    textStyle(BOLD);
    var lbl = str(this.label);
    text(lbl, this.x - textWidth(lbl) * 0.5, this.y - textHeight);
    textStyle(NORMAL);
    noStroke();
    var probText = 'p=' + formatFloat(this.p);
    text(probText, this.x, this.y + textHeight);
  }

  toString() {
    return this.label;
  }

}