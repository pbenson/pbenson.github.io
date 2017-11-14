"use strict";

var needsRedraw = true;
var drawingInProgress = true;
var userRemovedCells = [];
var voronoi, bbox, sites, diagram, menuChoices;

function makeCheckbox(name, initialValue, x, y) {
  var label = createP(name);
  label.position(10, y - 17);
  var checkbox = createCheckbox('', initialValue);
  checkbox.position(x, y);
  checkbox.style('width', '200px');
  checkbox.changed(forceRedraw);
  return checkbox;
}

function makeSlider(name, min, max, initialValue, x, y, sliderWidth, step) {
  var label = createP(name);
  label.position(10, y - 17);
  var slider = createSlider(min, max, initialValue);
  slider.position(x, y);
  slider.style('width', '' + sliderWidth + 'px');
  slider.input(forceRedraw);
  slider.attribute('step', step);
  slider.value(initialValue);
  return slider;
}
function makeSliderForceRecompute(name, min, max, initialValue, x, y, step) {
  var label = createP(name);
  label.position(10, y - 17);
  var slider = createSlider(min, max, initialValue);
  slider.position(x, y);
  slider.style('width', '200px');
  slider.input(forceRedrawAndRecompute);
  slider.attribute('step', step);
  slider.value(initialValue);
  return slider;
}

function forceRedrawAndRecompute() {
  forceRedraw();
  userRemovedCells = [];
  voronoi = new Voronoi();
  bbox = {
    xl: 0,
    xr: width,
    yt: 0,
    yb: height
  };
  sites = [];
  var trunkLength = height * 0.5 * scaleSlider.value();
  drawTree(width / 2, height * 0.99, width / 2, height * 0.99 - trunkLength, 0);
  diagram = voronoi.compute(sites, bbox);
}

function forceRedraw() {
  drawingInProgress = false;
  needsRedraw = true;
}

function makeButton(name, x, y, fun) {
  var button = createButton(name);
  button.position(x, y);
  button.mousePressed(fun);
  return button;
}

function makeRangeSelectMenu(name, start, end, initialMenuChoice, x, y) {
  menuChoices = [];
  for(var i = start; i < end; ++i) {
    menuChoices.push(i);
  }
  return makeSelectMenuWithSelection(name, menuChoices, initialMenuChoice, x, y);
}

function makeSelectMenu(name, menuChoices, x, y) {
  return makeSelectMenuWithSelection(name, menuChoices, menuChoices[0], x, y);
}

function makeSelectMenuWithSelection(name, menuChoices, initialMenuChoice, x, y) {
  var label = createP(name);
  label.position(10, y - 17);
  var sel = createSelect();
  sel.position(x + textWidth(name) + 20, y);
  for (var i = 0; i < menuChoices.length; ++i) {
    sel.option(menuChoices[i]);
  }
  sel.value(initialMenuChoice);
  sel.changed(forceRedraw);
  return sel;
}
