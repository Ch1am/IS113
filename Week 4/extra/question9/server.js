// Week 4 - Extra Question 9 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// START YOUR CODE HERE

// Endpoint to process F1 form submission
server.post('/process-form', (req, res) => {  
  // Retrieve data input data
  const winners = req.body.winners; 
  const teams = req.body.teams;     
  let outputStr = '<h3>Winners</h3>';

  // Validate winners selection and prepare winners output
  if (!winners || winners.length === 0) {
    outputStr += 'No winner selected';
  } else if (!Array.isArray(winners)) {
    outputStr += '<ul><li>' + winners + '</li></ul>';
  } else {
    outputStr += '<ul>';
    winners.forEach(winner => {
      outputStr += `<li>${winner}</li>`;
    });
    outputStr += '</ul>';
  }

  outputStr += '<h3>Teams</h3>';
  // Validate teams input and prepare teams output
  if (!teams || teams.length === 0) {
    outputStr += 'No team selected';
  } else if (!Array.isArray(teams)) {
    outputStr += '<ol><li>' + teams + '</li></ol>';
  } else {
    outputStr += '<ol>';
    teams.forEach(team => {
      outputStr += `<li>${team}</li>`;
    });
    outputStr += '</ol>'; 
  }

  // Display on Web Browser the result
  res.send(outputStr);

});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
