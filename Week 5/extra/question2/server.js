// Week 5 - Extra Question 2 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// START YOUR CODE HERE

// handle GET requests to "/"
server.get('/', (req, res) => {
  // Render the temperature view with default values
  res.render('temperature', {temp : '', conversion : 'f', message : ''}); 
});

server.post('/process-form', (req, res) => {
  // Extract temperature and conversion type from the request body
  const temp = req.body.temp;
  const conversion = req.body.conversion;
  let message = '';

  // Validate the temperature input
  if (temp === ''){
    message = '';
  } else {
    // Convert temperature based on the selected conversion type
    if (conversion === 'f') {
      // Convert Fahrenheit to Celsius
      const celsius = (parseFloat(temp) - 32) * 5/9;
      message = `${celsius.toFixed(2)} degrees Celsius`;
    } else if (conversion === 'c') {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (parseFloat(temp) * 9/5) + 32;
      message = `${fahrenheit.toFixed(2)} degrees Fahrenheit`;
    }
  }
  // Render the temperature view with the converted message
  res.render('temperature', {temp, conversion, message});
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

