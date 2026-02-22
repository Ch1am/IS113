// Week 5 - Extra Question 6 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// START YOUR CODE HERE

// Handle GET request to /
server.get('/', (req, res) => {
  // Render the bus fare view with default values
  const ageGroups = ['Children', 'Adults', 'Seniors'];
  const times = ['Peak', 'None-Peak'];
  selectedAgeGroup = 'Adults';
  selectedTime = 'Peak';
  const distance = '';
  const message = '';  

  // Render the bus fare view with age groups and times
  res.render('bus-fare', { ageGroups, selectedAgeGroup, times, selectedTime, distance : '', message : '' });
});

// Handle POST request to /bus-fare
server.post('/bus-fare', (req, res) => {
  // retrieve data input data 
  const ageGroups = ['Children', 'Adults', 'Seniors'];
  const times = ['Peak', 'None-Peak'];
  const enteredDistance = req.body.distance || '';
  // Convert distance to a number
  const distance = parseFloat(enteredDistance);
  const selectedAgeGroup = req.body.ageGroup; 
  const selectedTime = req.body.time;
  let fare = 0;
  let message = '';

  // Validate distance input
  if (isNaN(distance) || distance < 0) {
    message = '<h3>Distance must be an integer or float.</h3>';
    res.render('bus-fare', { ageGroups, selectedAgeGroup, times, selectedTime, distance: enteredDistance, message });
    return;
  }

  // calculate fare based on distance, age group, and time
  if (selectedTime === 'Peak') {
    fare = distance * 0.15; // peak fare
  } else {
    fare = distance * 0.1; // non-peak fare
  }
  if (selectedAgeGroup === 'Children') {  
    fare *=  0.5; // children discount
  } else if (selectedAgeGroup === 'Seniors') {
    fare *= 0.75; // senior discount
  } 
  // prepare the message to be displayed
  message = `<h3> Summary </h3>
              Distance: ${distance} kms <br>
              Age Group: ${selectedAgeGroup} <br>
              Time: ${selectedTime} <br>
              Fare is $ ${fare.toFixed(2)}`;
  res.render('bus-fare', { ageGroups, selectedAgeGroup, times, selectedTime, distance, message });
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
