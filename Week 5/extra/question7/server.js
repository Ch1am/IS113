// Week 5 - Extra Question 7 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// START YOUR CODE HERE

server.get('/', (req, res) => {
  // Render the prime number view with default values
  const message = ''; 
  res.render('prime', { message });
});

server.get('/process', (req, res) => {
  // Retrieve the number from the query parameters
  const num = parseInt(req.query.num);
  // Initialize message
  let message = '';

  // Validate the input
  if (isNaN(num)) {
    message = '<h3>Error</h3>Please enter a valid number.';
  } else if (num < 2) {
    message = `<h3>Error</h3>Please enter a whole number greater than 1.`;
  } else {
    // Check if the number is prime
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    // Set the message based on whether the number is prime or not
    message = `<h3>Summary</h3>`;
    if (isPrime) {
      message += `${num} is a prime number.`;
    } else {
      message += `${num} is NOT a prime number.`;
    }
  }

  // Render the prime view with the message
  res.render('prime', { message });
});

// End YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
