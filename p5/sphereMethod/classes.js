"use strict";

class FacetalHyperplane {
  constructor(a0_, a1_, b_) {
    this.a0 = a0_;
    this.a1 = a1_;
    this.b = b_;
  }

  fitTo(x, y) {
    this.b = this.a0 * x + this.a1 * y;
  }

  norm() {
    return dist(0, 0, this.a0, this.a1);
  }

  updateGraphingEndpoints() {
    if (this.a1 == 0) {
      this.x0 = this.b / this.a0;
      this.x1 = x0;
      this.y0 = yMax;
      this.y1 = -yMax;
    } else {
      this.x0 = -xMax * 2;
      this.x1 = -this.x0;
      this.y0 = (this.b - this.a0 * this.x0) / this.a1;
      this.y1 = (this.b - this.a0 * this.x1) / this.a1;
    }
  }

  drawPlane() {
    this.updateGraphingEndpoints();
    line(this.x0, this.y0, this.x1, this.y1);
  }


  drawHalfPlane() {
    //first the line
    stroke(0, 128);
    strokeWeight(1.0 / pixPerUnit);
    this.drawPlane();

    //now the half-plane
    fill(128, 20);
    noStroke();
    beginShape();
    vertex(this.x0, this.y0);
    vertex(this.x1, this.y1);
    var vx = this.y1 - this.y0;
    var vy = this.x0 - this.x1;
    var k = 1000;
    vx *= k;
    vy *= k;
    if (this.isFeasible(vx, vy)) {
      vx = -vx;
      vy = -vy;
    }
    vertex(vx, vy);
    endShape(CLOSE);
  }

  isFeasible(x0, x1) {
    return this.a0 * x0 + this.a1 * x1 >= this.b;
  }

  distanceFrom(x, y) {
    //return distnace from x, y to projection onto constraint facet
    return abs((this.a0 * x + this.a1 * y - this.b) / dist(0, 0, this.a0, this.a1));
  }

}

class ConstraintSet {
  constructor() {
    this.facetalHyperplanes = [];
  }

  addConstraint(a0, a1, b) {
    this.facetalHyperplanes.push(new FacetalHyperplane(a0, a1, b));
  }

  delta(x, y) {
    //return radius of largest ball in interior of constraint set
    var minRadius = 1e+30;
    for (var fhpIndex = 0; fhpIndex < this.facetalHyperplanes.length; ++fhpIndex) {
      minRadius = min(minRadius, this.facetalHyperplanes[fhpIndex].distanceFrom(x, y));
    }
    return minRadius;
  }

  draw() {
    for (var fhpIndex = 0; fhpIndex < this.facetalHyperplanes.length; ++fhpIndex) {
      stroke(32);
      this.facetalHyperplanes[fhpIndex].drawHalfPlane();
    }
  }

  isFeasible(x0, x1) {
    for (var fhpIndex = 0; fhpIndex < this.facetalHyperplanes.length; ++fhpIndex) {
      if (!this.facetalHyperplanes[fhpIndex].isFeasible(x0, x1)) {
        return false;
      }
    }
    return true;
  }


}

class Sphere {
  constructor() {
    this.moveCenterToMouse();
  }

  centerIsFeasible() {
    return constraintSet.isFeasible(this.x, this.y);
  }

  moveCenterToMouse() {
    this.x = mouseToX();
    this.y = mouseToY();
  }

  draw() {
    //draw center of sphere
    ellipse(this.x, this.y, markerDiameter, markerDiameter);

    //draw sphere
    var diameter = this.radius() * 2;
    //weird bug in hosted version where ellipse occasionally displays a rectangle frame (and no ellipse)
    //trying arc instead...
    arc(this.x, this.y, diameter, diameter, 0, TWO_PI);
  }

  radius() {
    return constraintSet.delta(this.x, this.y);
  }

  objectiveTouchPoint() {
    var r = this.radius();
    var xTouch = this.x - objectiveFunction.a0 * r / objectiveFunction.norm();
    var yTouch = this.y - objectiveFunction.a1 * r / objectiveFunction.norm();
    return new Point(xTouch, yTouch);
  }

  centerProjection(facetalHyperplane) {
    var r = facetalHyperplane.distanceFrom(this.x, this.y);
    var xTouch = this.x - facetalHyperplane.a0 * r / facetalHyperplane.norm();
    var yTouch = this.y - facetalHyperplane.a1 * r / facetalHyperplane.norm();
    return new Point(xTouch, yTouch);
  }

  touchPoints() {
    var points = [];
    var r = this.radius();
    for (var fhpIndex = 0; fhpIndex < constraintSet.facetalHyperplanes.length; ++fhpIndex) {
      var h = constraintSet.facetalHyperplanes[fhpIndex];
      if (abs(h.distanceFrom(this.x, this.y) - r) < 0.001) {
        points.push(this.centerProjection(h));
      }
    }
    return points;
  }
}

class Point {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  distanceFrom(pt) {
    return dist(this.x, this.y, pt.x, pt.y);
  }

  draw() {
    return ellipse(this.x, this.y, markerDiameter, markerDiameter)
  }

  display() {
    return '(' + this.x + ',' + this.y + ')';
  }
}

class LineSegment {
  constructor(x0_, y0_, x1_, y1_) {
    this.x0 = x0_;
    this.y0 = y0_;
    this.x1 = x1_;
    this.y1 = y1_;
  }

  drawToFirstConstraint() {
    var minDist = 1e+30;
    var firstIntersectPoint;
    var p2 = new Point(this.x1, this.y1);
    for (var fhpIndex = 0; fhpIndex < constraintSet.facetalHyperplanes.length; ++fhpIndex) {
      var h = constraintSet.facetalHyperplanes[fhpIndex];
      var intersectPt = this.intersectionWithHyperplane(h);
      //in correct direction?
      if (Math.sign(this.x1 - this.x0) == Math.sign(intersectPt.x - this.x1)) {
        var d = p2.distanceFrom(intersectPt);
        if (d < minDist) {
          minDist = d;
          firstIntersectPoint = intersectPt;
        }
      }
    }
    strokeWeight(1.0 / pixPerUnit);
    line(this.x0, this.y0, firstIntersectPoint.x, firstIntersectPoint.y);
    return firstIntersectPoint;
  }

  intersectionWithHyperplane(h) {
    var dx = this.x1 - this.x0;
    var dy = this.y1 - this.y0;
    var x = ((h.b - h.a1 * this.y0) * dx + h.a1 * this.x0 * dy) / (h.a0 * dx + h.a1 * dy);
    var y = dy * (x - this.x0) / dx + this.y0;
    return new Point(x, y);
  }
}