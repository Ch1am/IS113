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
server.set("view engine", "ejs");

// END OF DO NOT MODIFY THIS PART

// PART A - ADD YOUR CODE BELOW










// PART A - END OF ADDING YOUR CODE

// ===================================================================

// PART B - ADD YOUR CODE BELOW

// List of available fruit options to be displayed in the form
const fruitOptions = ["Apple", "Orange", "Pear"];










// PART B - END OF ADDING YOUR CODE

// DO NOT MODIFY THIS PART

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// END OF DO NOT MODIFY THIS PART
