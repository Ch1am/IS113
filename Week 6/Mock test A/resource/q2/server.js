/* 
    Name:  
    Email: 
*/

// DO NOT MODIFY THIS PART

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));

// END OF DO NOT MODIFY THIS PART

// PART A - ADD YOUR CODE BELOW
server.post("/q2a-process", (req,res) => {
  let result = [] // [true,true,false]

  //check divisibility of each number and store result as "YES" or "NO"
  // forEach, map, filter, find sort
  let doubleNumber = numbers.map((num) => num *2)

  // check week 2
  numbers.forEach((num) => {
    const status = isDivisibleBy (num, divisor)
    if (status) {
      result.push("ES")
    }else{
      result.push("NO")
    }
  });

})









// PART A - END OF ADDING YOUR CODE

// ==================================================================

// PART B - ADD YOUR CODE BELOW










// PART B - END OF ADDING YOUR CODE

// DO NOT MODIFY THIS PART

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// END OF DO NOT MODIFY THIS PART
