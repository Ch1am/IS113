// Week 5 - Example 3 - server.js

const express = require("express");
const server = express();

// Configure view engine to EJS
// server.set() method is used to configure EJS as the view (templating) engine.
// By default, Express looks for .ejs files in the views folder for rendering templates.
server.set("view engine", "ejs");

// Handle GET requests to "/text-form":
server.get("/text-form", (req, res) => {
  const fullName = req.query.fullName;
  // res.render() method is used to render text-form.ejs and pass the value
  // of fullName to it, allowing the template to display its value within  the HTML.
  res.render("text-form", { fullName });
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
