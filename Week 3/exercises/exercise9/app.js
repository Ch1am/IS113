// TODO: Import areaCircle from shapes.js, but rename it locally to circleArea
// Hint: const { areaCircle: circleArea } = require('./shapes');

// TODO: Import the entire shapes module
// Hint: const shapes = require('./shapes');

// TODO: Call circleArea(3) and log result (expected ~28.26)
// TODO: Call shapes.areaSquare(4) and log result (expected 16)
// TODO: Call shapes.areaTriangle(3, 4) and log result (expected 6)

const { areaCircle: circleArea } = require('./shapes');
const shapes = require('./shapes');
console.log(circleArea(3));
console.log(shapes.areaSquare(4));
console.log(shapes.areaTriangle(3, 4))

