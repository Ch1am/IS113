// TODO: Import add and subtract from math.js
// TODO: Import PI and E from constants.js
// TODO: Import the default-like function from formatter.js
const {PI, E} = require("./constants.js")
const {add,subtract} = require("./math.js")
const formatResult = require("./formatter.js")

// TODO: Compute add(PI, E)
// TODO: Format the result using formatResult()
// TODO: Log the formatted result
console.log(formatResult(add(PI, E)))
