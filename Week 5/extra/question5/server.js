// Week 5 - Extra Question 5 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");


// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

const reasonsList = [ "Lose Weight", "Find Love", "Build Muscles" ];
const gymTypesDict = { 
    'men' : 'Men only',
    'women' : 'Women only',
    'anything' : 'Anything'
};

// START YOUR CODE HERE

// Handle GET request to /
server.get('/', (req, res) => {
  // Render the signup view with default values 
  const selectedReasons = [];
  const selectedGymType = '';
  const gymTypesList = Object.values(gymTypesDict);
  const errorMessages = [];

  // Render the signup view with reasons and gym types
  res.render('signup', { reasonsList, selectedReasons, gymTypesList, selectedGymType, errorMessages });
});

// Handle POST request to /signup
server.post('/process-form', (req, res) => {  
  let selectedReasons = req.body.reasons || [];
  if (!Array.isArray(selectedReasons)) {
    selectedReasons = [selectedReasons]; // Convert to array if only one reason is selected
  } 
  let selectedGymType = req.body.gymType;
  const gymTypesList = Object.values(gymTypesDict);
  let errorMessages = [];

  // Validate the inputs
  if (!selectedReasons || selectedReasons.length === 0) {
    errorMessages.push("Select at least one reason!");
    selectedReasons = [];
  }
  if (!selectedGymType) {
    errorMessages.push("You must select a type!");

  }

  // If there are errors, re-render the form with error messages
  if (errorMessages.length > 0) {
    res.render('signup', { reasonsList, selectedReasons, gymTypesList, selectedGymType, errorMessages });
    return;
  }

  // If no errors, render the success page
  res.send("Thank you for signing up!");
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
