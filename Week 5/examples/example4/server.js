// Week 5 - Example 4 - server.js

const express = require("express");
const server = express();

server.set("view engine", "ejs");

server.get("/consent-form", (req, res) => {
  const rawFullName = req.query.fullName;
  const consent = req.query.consent;
  let fullName = "";
  let errors = [];

  // Do note that fullName is undefined on the initial page load.
  if (rawFullName !== undefined) {
    fullName = rawFullName.trim();

    // Construct error messages in the errors array based on different validation scenarios.
    if (fullName === "") {
      errors.push("Please enter your name.");
    }
    if (consent === undefined) {
      errors.push("Please agree to T&C.");
    }
  }

  // Express renders consent-form.ejs and displays the form with or without error messages. 
  // The values of fullName and consent are also rendered in the form for data retention purposes.
  if (errors.length > 0) {
    res.render("consent-form", { fullName, consent, error: errors.join("<br>") });
  } else {
    res.render("consent-form", { fullName, consent, error: "" });
  }
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
