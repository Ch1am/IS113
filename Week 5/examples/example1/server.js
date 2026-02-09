// Week 5 - Example 1 - server.js

const express = require("express");
const server = express();

// Route to serve the HTML form when accessing "/text-form"
server.get("/text-form", (req, res) => {
  res.send(`
        <form action="/process-form" method="get">
          Enter your name:
          <input type="text" name="fullName">
          <button type="submit">Send</button>
        </form>
     `);
});

// Route to handle form submission when accessing "/process-form"
server.get("/process-form", (req, res) => {
  const fullName = req.query.fullName;
  res.send(`Hi ${fullName}. Welcome to IS113!`);
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
