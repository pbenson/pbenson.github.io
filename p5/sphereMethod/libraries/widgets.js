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

function makeCheckbox(name, initialValue, x, y) {
  var label = createP(name);
  label.position(10, y - 17);
  var checkbox = createCheckbox('', initialValue);
  checkbox.position(x, y);
  checkbox.style('width', '80px');
  checkbox.changed(forceRedraw);
  return checkbox;
}

function makeSelectMenu(name, values, x, y) {
  var label = createP(name);
  label.position(10, y - 17);
  var sel = createSelect();
  sel.position(x, y);
  for (var i = 0; i < values.length; ++i) {
    sel.option(values[i]);
  }
  sel.changed(forceRedraw);
  return sel;
}

function forceRedraw() {
  drawingInProgress = false;
  needsRedraw = true;
}