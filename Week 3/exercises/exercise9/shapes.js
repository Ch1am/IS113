// TODO: Define a constant PI = 3.14

// TODO: Write function areaCircle(r) that returns PI * r * r
// TODO: Write function areaSquare(s) that returns s * s
// TODO: Write function areaTriangle(b, h) that returns 0.5 * b * h

// TODO: Export all three functions as named members using module.exports
const PI = 3.14
function areaCircle(r){
    return (PI * r * r).toFixed(2)
}
function areaSquare(s) {
    return(s*s)
}
function areaTriangle(b,h){
    return (0.5*b*h)
}
module.exports = {areaCircle,areaSquare,areaTriangle}