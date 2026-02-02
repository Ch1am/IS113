// Week 4 - Exercise 3 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE













// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
