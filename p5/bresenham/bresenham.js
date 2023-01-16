// Must pass integers!
function bresenhamCoordinates (x, y, x2, y2) {
    var coordinatesArray = new Array();
 
     // Define differences and error check
    var dx = Math.abs(x2 - x);
    var dy = Math.abs(y2 - y);
    var sx = (x < x2) ? 1 : -1;
    var sy = (y < y2) ? 1 : -1;
    var err = dx - dy;
    // // Set first coordinates
    // coordinatesArray.push({x, y});
    // Main loop
    while (!((x == x2) && (y == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
      // Set coordinates
      coordinatesArray.push({x, y});
    }
    // Return the result
    return coordinatesArray;
  }