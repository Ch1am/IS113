// Week 5 - Exercise 3 - server.js

const express = require("express");
const server = express();

// Hardcoded list of countries
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

// Harcoded Country-to-capital Object
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

// Set view engine to EJS
server.set("view engine", "ejs");

// To parse form submission
server.use(express.urlencoded({ extended: true }));

// Serve the form
server.get("/country-form", (req, res) => {
  // Renders the "country-form.ejs" view and passes the "countries" array to it
  res.render("country-form", { countries });
});

// Handle form submission
server.post("/country-form", (req, res) => {
  // Retrieve selected country/countries from the request body
  let selected = req.body.countries;

  // If nothing is selected, render result view with null result
  if (selected === undefined) {
    res.render("result", { result: null });
    return;
  }

  // If only one country is selected, convert it from string to array
  if (!Array.isArray(selected)) {
    selected = [selected];
  }

  // Create a new array of objects, each containing a country and its capital
  const result = [];
  selected.forEach((country) => {
    result.push({
      country,
      capital: capitals[country],
    });
  });

  // Render the result view, passing the result data for display
  res.render("result", { result });
});

// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
