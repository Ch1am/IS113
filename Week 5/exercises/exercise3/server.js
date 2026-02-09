// Week 5 - Exercise 3 - server.js

const express = require("express");
const server = express();

// Hard-coded list of countries
const countries = [
  "Singapore",
  "Indonesia",
  "Malaysia",
  "Philippines",
  "Thailand",
  "Brunei",
  "Cambodia",
  "Laos",
  "Vietnam",
  "Myanmar",
];

// Hard-coded Country-to-capital Object
const capitals = {
  Singapore: "Singapore",
  Malaysia: "Kuala Lumpur",
  Philippines: "Manila",
  Indonesia: "Jakarta",
  Thailand: "Bangkok",
  Brunei: "Bandar Seri Begawan",
  Cambodia: "Phnom Penh",
  Laos: "Vientiane",
  Myanmar: "Naypyidaw",
  Vietnam: "Hanoi",
};

// START YOUR CODE HERE















// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
