/* 
    Name:  
    Email: 
*/

// DO NOT MODIFY THIS PART

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// END OF DO NOT MODIFY THIS PART

// PART A - ADD YOUR CODE BELOW
server.post("/q3a-display", (req, res) => {
  const selectedFruits = req.body.fruits;

  // Validate input: if no fruit is selected, return message and empty array
  if (!selectedFruits) {
    return res.render("q3a-display", {
      fruitsToDisplay: [],
      msg: "Please select a fruit",
    });
  }

  // Ensure selectedFruits is always an array (even if only one fruit is selected)
  const selectedFruitsArr = Array.isArray(selectedFruits)
    ? selectedFruits
    : [selectedFruits];

  // Render the view with selected fruits and no error message
  res.render("q3a-display", { fruitsToDisplay: selectedFruitsArr, msg: "" });
});

// PART A - END OF ADDING YOUR CODE

// ===================================================================

// PART B - ADD YOUR CODE BELOW
// List of available fruit options to be displayed in the form
const fruitOptions = ["Apple", "Orange", "Pear"];

// Route to handle initial page load with GET method
server.get("/q3b-one", (req, res) => {
  // Render the page with fruit options, no selected fruits, and an empty message
  res.render("q3b-one", { fruitOptions, fruitsToDisplay: undefined, msg: "" });
});

// Route to handle form submission with POST method
server.post("/q3b-one", (req, res) => {
  const selectedFruits = req.body.fruits;

  // If no fruits selected, render page with message asking for selection
  if (!selectedFruits) {
    return res.render("q3b-one", {
      fruitOptions,
      fruitsToDisplay: undefined,
      msg: "Please select a fruit",
    });
  }

  // Ensure the selected fruits is an array (handles single selection)
  const selectedFruitsArr = Array.isArray(selectedFruits)
    ? selectedFruits
    : [selectedFruits];

  // Count the number of selected fruits and prepare message with correct pluralization
  const count = selectedFruitsArr.length;
  const suffix = count > 1 ? "s" : "";
  const msg = `You selected ${count} fruit${suffix}`;

  // Render the page with fruit options, selected fruits, and summary message
  res.render("q3b-one", {
    fruitOptions,
    fruitsToDisplay: selectedFruitsArr,
    msg,
  });
});

// PART B - END OF ADDING YOUR CODE

// DO NOT MODIFY THIS PART

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// END OF DO NOT MODIFY THIS PART
