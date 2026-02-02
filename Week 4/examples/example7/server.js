// Week 4 - Example 7 - server.js

const express = require("express");
const server = express();
const path = require("path");

// Serve text-form.html from "public" folder
server.use("/", express.static(path.join(__dirname, "public")))

// Route to handle GET form data
server.get("/process-form", (req, res) => {
  const fullName = req.query.fullName;
  res.send(`Hi ${fullName}. Welcome to IS113!`);
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
