// Week 4 - Extra Question 6 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// calculate two numbers
server.post('/process-two', (req, res) => {

  // START YOUR CODE HERE

  // retrieving data entered by the user
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const operator = req.body.operator;

  let outputStr = '';
  let missing = [];

  // Validate inputs

  if (num1 === '') {
    missing.push('num1 is missing');
  }
  if (isNaN(num1)) {
    missing.push('num1 is non-numeric');
  }
  if (num2 === '') {
    missing.push('num2 is missing');
  }
  if (isNaN(num2)) {
    missing.push('num2 is non-numeric');
  }

  // displaying error messages if any
  if (missing.length > 0) {
    outputStr = '<ul>';
    missing.forEach(item => {
      outputStr += `<li>${item}</li>`;
    });
    outputStr += '</ul>';
  } else {
    // there is no error, calculation can occur
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    const result = calculate2(n1, n2, operator);
    outputStr = `<h3>${result}</h3>`;
  }
  
  // Sending the outputStr
  res.send(outputStr);
  
   // END YOUR CODE HERE

});


// calculate three numbers
server.post('/process-three', (req, res) => {

  // START YOUR CODE HERE

  // retrieving data entered by the user
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const num3 = req.body.num3;
  const operator1 = req.body.operator1;
  const operator2 = req.body.operator2;

  let outputStr = '';
  let missing = [];

  // The write up assumes that all inputs are valid. so no input validation here.
  const n1 = parseInt(num1);
  const n2 = parseInt(num2);
  const n3 = parseInt(num3);

  // handling the operator precedence rules
  if ((operator1 === '+' || operator1 == '-') && 
      (operator2 === '/' || operator2 === '*')){
    // division or multiplication must occur first
    value = calculate2(n2,n3,operator2);
    // checking if value is not undefined
    if (value !== 'Undefined') {
      // we can complete the calculation with + or -
      value = calculate2(n1, value, operator1)
    }
  } else {
    // operations occur from left to right
    value = calculate2(n1, n2, operator1);
    if (value !== 'Undefined') {
      // we can proceed with the calculation
      value = calculate2(value, n3, operator2);
    }
  }
  outputStr = '<h3>Result: ' + value + '</h3>';

  // Sending the outputStr
  res.send(outputStr);

   // END YOUR CODE HERE
});


function calculate2(n1, n2, operator) {

  // START YOUR CODE HERE
  let result = 0;

  if (operator === '+') {
    result = n1 + n2;
  } else if (operator === '-') {
    result = n1 - n2;
  } else if (operator === '*') {
    result = n1 * n2;
  } else if (operator === '/') {
    // here we have to check that the division can occur
    if (n2 === 0) {
      result = 'Undefined';
    } else {
      result = n1 / n2;
    }
  } 
  return result;

  // END YOUR CODE HERE

}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
