// Week 4 - Exercise 4 - server.js

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

  let missing = [];

  if (!firstName) {
    missing.push("First Name");
  }
  if (!lastName) {
    missing.push("Last Name");
  }
  if (!gender) {
    missing.push("Gender");
  }

  if (missing.length > 0) {
    return res.send(
      `Error: Missing field(s) - ${missing.join(", ")}.`
    );
  }

  let salutation = "Ms.";
  if (req.body.gender === "M") {
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
