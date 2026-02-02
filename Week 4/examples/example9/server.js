// Week 4 - Example 9 - server.js

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")))

// Route to handle GET form data
server.get("/process-form", (req, res) => {
  const target = req.query.target;
  res.redirect(target);
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
