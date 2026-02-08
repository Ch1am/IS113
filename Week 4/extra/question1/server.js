// Week 4 - Extra Question 1 - server.js
// -------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// START YOUR CODE HERE

server.post('/process-form', (req, res) => {
  const message = req.body.msg;
  const numInput = req.body.num;  
  let outputStr = ''; 

  let missing = [];

  if (message === '') {
    missing.push('Why No Message?');
  } 
  const num = Number(numInput);
  if (numInput === '') {      
    missing.push('Why No Number?');
    missing.push('Num is not an Integer');
  } else if (isNaN(num) || !Number.isInteger(num)) {
    missing.push('Num is not an Integer');  
  }

  if (missing.length > 0) {
    outputStr = '<ol>'; 
    for (let i = 0; i < missing.length; i++) {
      outputStr += '<li>' + missing[i] + '</li>';
    }
    outputStr += '</ol>';
  } else {
    outputStr = '<table border=1><tr><th>S//N</th><th>Message</th></tr>';
    for (let i = 1; i <= num; i++) {
      outputStr += '<tr><td>' + i + '</td><td>' + message + '</td></tr>';
    }
    outputStr += '</table>';
    }   

  res.send(outputStr);
});
// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
