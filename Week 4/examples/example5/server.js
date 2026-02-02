// Week 4 - Example 5 - server.js

const express = require("express");
const server = express();

// Set GET requests to the root URL ("/")
server.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Set GET requests to the root URL ("/about")
server.get("/about", (req, res) => {
  res.send("This is the about page!");
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
