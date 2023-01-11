"use strict";

var modulusSlider, multiplierSlider, opacitySlider, sizeSlider, penSlider, circleInversionCheckbox;

var sliderInset = 120;
var sliderWidth = 600;
var needsRedraw = true;

var r;

function setup() {
  createCanvas(1200, 1200);

  modulusSlider = makeSlider("modulus", 5, 360, 10, sliderInset, 20, sliderWidth, 1);
  multiplierSlider = makeSlider("multiplier", 2, 360, 2, sliderInset, 50, sliderWidth, 1);
  opacitySlider = makeSlider("opacity", 0, 255, 255, sliderInset, 80, sliderWidth, 1);
  sizeSlider = makeSlider("size", 0.1, 4, 1, sliderInset, 110, sliderWidth, 0.01);
  penSlider = makeSlider("pen", 1, 10, 1, sliderInset, 140, sliderWidth, 0.1);
  circleInversionCheckbox = makeCheckbox("circle inversion", false, sliderInset, 170);
}

function drawCircleOnly() {
  noFill();
  push();
  // var opacity = opacitySlider.value();
  stroke(0, opacitySlider.value());
  strokeWeight(penSlider.value());
  var r = width * 0.15;
  var mod = modulusSlider.value();
  var mult = multiplierSlider.value();
  translate(width / 2, height / 2);
  scale(1, -1);
  r *= sizeSlider.value();
  var diameter = 2 * r;
  ellipse(0, 0, diameter, diameter);
  for (var i = 0; i < mod; ++i) {
    var a1 = TWO_PI / mod * i;
    var a2 = a1 * mult;

    if(i%2 == 0) {
      stroke(255,0,0, opacitySlider.value());
    } else {
      stroke(0, 0, 255, opacitySlider.value());
    }
    if (!circleInversionCheckbox.checked()) {
      var x1 = r * cos(a1)
      var y1 = r * sin(a1)
      var x2 = r * cos(a2)
      var y2 = r * sin(a2)
      var xMid = (x1 + x2) / 2
      var yMid = (y1 + y2) / 2
      var segmentScale = 1;
      line(xMid + (x1 - xMid) * segmentScale,
        yMid + (y1 - yMid) * segmentScale,
        xMid + (x2 - xMid) * segmentScale,
        yMid + (y2 - yMid) * segmentScale);
    } else {
      var inversionAngle = (a2 - a1) / 2;
      var xChordCenter = r * cos(inversionAngle);
      if (abs(xChordCenter) > r * 0.001) {
        diameter = r * r / xChordCenter;
        var xCircCenter = diameter / 2;
        push();
        rotate(a1 + inversionAngle);
        ellipse(xCircCenter, 0, abs(diameter), abs(diameter));
        pop();
      }
    }
  }
  pop();
}


function draw() {
  if (!needsRedraw) {
    return;
  }
  needsRedraw = false;
  background(255);
  drawCircleOnly();

  //
  fill(255, 0, 0);
  noStroke();
  var valueTextOffset = sliderInset + sliderWidth + 10;
  text(modulusSlider.value(), valueTextOffset, 33);
  text(multiplierSlider.value(), valueTextOffset, 63);
  text(opacitySlider.value(), valueTextOffset, 93);
  text(sizeSlider.value(), valueTextOffset, 123);
  text(penSlider.value(), valueTextOffset, 153);
  // var msg = "Type 's' to save as PNG."
  // text(msg, (width - textWidth(msg)) / 2, 20);

}

// function keyTyped() {
//   if (key == 's') {
//     var sizeScalar = 1;
//     createCanvas(width * sizeScalar, height * sizeScalar);
//     noSmooth();
//     drawLSystemOnly();
//     var filename = 'timesTableOnCircle_mod_' + modulusSlider.value() + '_mult_' + multiplierSlider.value() + '.png';
//     save(filename);
//     createCanvas(width / sizeScalar, height / sizeScalar);
//     needsRedraw = true;
//   }
// }
