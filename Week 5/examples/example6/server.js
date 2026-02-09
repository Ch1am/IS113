// Week 5 - Example 6 - server.js

const express = require("express");
const server = express();
server.use(express.urlencoded());
server.set("view engine", "ejs");

// Hardcoded object data used to retrieve values based on their keys.
const phoneBook = {
  Bob: "+65-9828349",
  Andy: "+62-9382383",
};

server.get("/search-form", (req, res) => {
  res.render("search-form", { message: "", person: ""});
});

server.post("/search-form", (req, res) => {
  const person = req.body.person;
  let message = "";

  // Perform a phone number search using the key-value pairs stored 
  // in the phoneBook object.
  if (phoneBook[person]) {
    message = `${person}'s phone number is ${phoneBook[person]}.`;
  } else {
    message = `${person} is not in the phone book.`;
  }
  res.render("search-form", { message, person });
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
