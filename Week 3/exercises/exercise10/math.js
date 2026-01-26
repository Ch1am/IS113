// TODO: Write a function add(a, b) that returns the sum
// TODO: Write a function subtract(a, b) that returns the difference

const Module = require("node:module");

// TODO: Export both functions as named members using module.exports

let add= (a,b) => {return a+b};
let subtract= (a,b) => {return a-b};

module.exports = {add,subtract}

