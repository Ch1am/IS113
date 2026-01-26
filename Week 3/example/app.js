/*
    Export  Modules
        module.exports = { <function_name> }
    Import Modules
        const { <function_name>  } = require('...')
*/

/* 
    1) named exports
        module.exports = { doubleAll, evenNumber, oddNumbers }
        
        import using destructuring
        const { doubleAll, evenNumbers, oddNumbers } = require('./utility.js')
*/
// const { doubleAll, evenNumbers, oddNumbers } = require('./utility.js')
// const arr = [ 2, 3, 5, 11, 17, 18, 20]
// let result = doubleAll(arr)
// console.log(result)


/*
    2) default export
        module.exports = log;      // main export
        module.exports.warn = warn; // additional named export
*/
// const log = require('./utility.js')
// log("log this message")
// const {warn} = require('./utility.js')
// warn("This is NOT a warning")




/*
     3) Aliasing and whole-module import
*/
const {areaCircle,pi: PI,squareArea} = require('./utility.js')

console.log(PI)
console.log(squareArea(2))