// Week 4 - Extra Question 5 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// START YOUR CODE HERE
// from ex1.html
// -------------

server.get('/form-triangle', (req, res) => {
  const num = req.query.num;
  let outputStr = '';

  for (let i=1; i<=num; i++) {
    for (let j=1; j<=i; j++) {
      outputStr += '*';
    }
    outputStr += '<br>';
  }
  res.send(outputStr);

});

// from ex2.html
// -------------

server.get('/form-arrow', (req, res) => {
  const num = req.query.num;
  let outputStr = '';

  // top part (increasing number of stars)
  for (let i=1; i<=num; i++) {
    for (let j=1; j<=i; j++) {
      outputStr += '*';
    }
    outputStr += '<br>';
  }

  // middle part (n+1 stars)
  for (let i=0; i<=num; i++) {
    outputStr += '*';
  }
  outputStr += '<br>';

  // bottom part (decreasing number of stars)
  for (let i=num; i>=1; i--) {
    for (let j=1; j<=i; j++) {
      outputStr += '*';
    }
    outputStr += '<br>';
  }
  // send the output
  res.send(outputStr);

});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
