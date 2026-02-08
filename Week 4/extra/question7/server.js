// Week 4 - Extra Question 7 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// START YOUR CODE HERE

// Endpoint to process equation
server.get('/process-equation', (req, res) => {
  // retrieve data input data
  const x = req.query.x;
  const y = req.query.y;

  // convert string inputs to numbers
  let num1 = parseInt(x);
  let num2 = parseInt(y);

  // calculate the result of the equation
  let result = (num1 * num1) + num2;

  // Display on Web Browser the result
  res.send(`<h3>The value of Z is ${result}</h3>`);

});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
