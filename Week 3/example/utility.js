// 1) Named exports
function doubleAll(arr) {
    return arr.map(x => x * 2)
}

function evenNumbers(arr) {
    return arr.filter(x => x % 2 === 0)
}

function oddNumbers(arr) {
    return arr.filter(x => x % 2 !== 0)
}
//module.exports = {oddNumbers:oddNumbers ,evenNumbers:evenNumbers,doubleAll:doubleAll}
// module.exports = {oddNumbers ,evenNumbers,doubleAll}
// ================================================== //

// 2) Default export -- export main function and others separately
function log(message) {
    console.log("LOG:", message)
}

function warn(message) {
    console.log("WARNING:", message)
}
// module.exports = log
// module.exports.warn = warn // additional export after you have exported a default function


// ================================================== //

// 3) Renaming export 
const PI = 3.14;

function areaCircle(r) {
    return (PI * r * r).toFixed(2);
}

function areaSquare(s) {
    return s * s;
}
module.exports = {
    areaCircle, pi : PI, squareArea: areaSquare
}