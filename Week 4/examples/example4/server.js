// Week 4 - Example 4 - server.js

const express = require("express");
const server = express();
const path = require("path");

// Serve static files from the "public" folder
server.use("/", express.static(path.join(__dirname, "public")))

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
