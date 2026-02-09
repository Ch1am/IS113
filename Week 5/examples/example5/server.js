// Week 5 - Example 5 - server.js

const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// Hardcoded array data used to generate the form’s checkbox options.
const fruits = ["Apple", "Banana", "Cherry"];

server.get("/fruit-form", (req, res) => {
  res.render("fruit-form", { fruits });
});

server.post("/fruit-form", (req, res) => {
  // To prevent selectedProducts from being undefined when no options are selected.
  const selectedProducts = req.body.products || [];

  // To ensure the user’s selection is always stored as an array,
  // even when only a single option is selected.
  const selected = Array.isArray(selectedProducts)
                   ? selectedProducts : [selectedProducts];

  res.send(
    `You selected: ${selected.length > 0 ? selected.join(", ") : "nothing"}.`
  );
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
