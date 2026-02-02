// Week 4 - Example 3 - server.js

// Import the Express framework
const express = require("express");

// Create an Express server object
const server = express();

// Set GET requests to the root URL ("/")
server.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Define the hostname and port for the server
const hostname = "localhost";
const port = 8000;

// Start server to listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
