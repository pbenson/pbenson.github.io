"use strict";

class Node {

  constructor(label, x, y, prob) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.p = prob;
    this.drag = false;
  }

  draw() {
    if (this.drag) {
      this.x = mouseX;
      this.y = mouseY;
    }

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
    var probText = 'p=' + this.p.toFixed(2);
    text(probText, this.x, this.y + textHeight);
  }

  dragIfSelected() {
    this.drag = dist(this.x, this.y, mouseX, mouseY) < nodeDiameter;
    console.log("dragIfSelected  "+mouseX);
    return this.drag;
  }

  releaseDrag() {
    this.drag = false;
  }


  toString() {
    return this.label;
  }

}