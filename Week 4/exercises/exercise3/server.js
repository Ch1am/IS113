// Week 4 - Exercise 3 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE

const path = require("path");
server.use("/", express.static(path.join(__dirname, "public")))

server.use(express.urlencoded({ extended: true }));

server.post("/process-form", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;

  let salutation = "Ms.";

  if (gender === "M") {
    salutation = "Mr.";
  }

  res.send(`
    Welcome ${salutation} ${firstName} ${lastName}!<br>
    You have been successfully registered! 
  `);
});

// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
