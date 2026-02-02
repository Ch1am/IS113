// Week 4 - Example 8 - server.js

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")))

// Parse URL-encoded data from POST requests
server.use(express.urlencoded({ extended: true }));

// Route to handle POST form data
server.post("/process-form", (req, res) => {
  const color = req.body.color;
  res.send(`You have chosen ${color} color!`);
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
