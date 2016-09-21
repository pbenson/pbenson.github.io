"use strict";

class Edge {

  constructor(node0, node1, cost) {
    this.node0 = node0;
    this.node1 = node1;
    this.cost = cost;
  }

  draw() {
    stroke(0);
    line(this.node0.x, this.node0.y, this.node1.x, this.node1.y);

    var costText = str(this.cost);
    var easing = 0.4;
    var midX = this.node0.x * easing + this.node1.x * (1-easing);
    var midY = this.node0.y  * easing+ this.node1.y * (1-easing);
    noStroke();
    fill(255);
    ellipse(midX, midY, textHeight * 2, textHeight * 2);
    fill(0);
    text(costText, midX, midY);
  }

}