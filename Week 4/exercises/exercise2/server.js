// Week 4 - Exercise 2 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE


const path = require("path");
server.use("/", express.static(path.join(__dirname, "public")))

server.get("/", (req, res) => {
  res.send("Welcome to our Cafe!");
});

server.get("/about", (req, res) => {
  res.send("We serve delicious food and drinks.");
});


// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
