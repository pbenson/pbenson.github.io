"use strict";

class Edge {

  constructor(node0, node1) {
    this.node0 = node0;
    this.node1 = node1;
  }
  
  cost() {
    return dist( this.node0.x,  this.node0.y,  this.node1.x,  this.node1.y);
  }

  draw() {
    stroke(0);
    line(this.node0.x, this.node0.y, this.node1.x, this.node1.y);

    var costText =this.cost().toFixed(0);
    var easing = 0.3;
    var midX = ease(this.node0.x, this.node1.x,  easing);
    var midY = ease(this.node0.y, this.node1.y,  easing);
    noStroke();
    fill(255);
    ellipse(midX, midY, textHeight * 2, textHeight * 2);
    fill(0);
    text(costText, midX, midY);
  }

}