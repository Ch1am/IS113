// Week 5 - Extra Question 3 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

const schools = {
    'LKCSB' : 'Business',
    'SOE' : 'Economics',
    'SCIS' : 'Information systems',
    'SOL' : 'Law',
    'SOA' : 'Accountancy',
    'SOSS' : 'Social Sciences'
};

const messages = {
    'LKCSB' : 'Money Money Money',
    'SOE' : 'Inflation Time',
    'SCIS' : '1s and 0s',
    'SOL' : 'See you in court',
    'SOA' : 'Spreadsheet',
    'SOSS' : 'We Love People'
};

// START YOUR CODE HERE

// Handle GET requests to "/"
server.get('/', (req, res) => { 
  //extract the school names from school
  const schoolNames = Object.values(schools);
  // Render the select view with default values
  res.render('select', {schoolNames, selectedSchoolName: '', message: ''}); 
});

// Handle POST requests to "/process-form"
server.post('/process-form', (req, res) => {
  // Extract the selected school from the request body
  const selectedSchoolName = req.body.schoolName || '';
  let message = '';

  // find the school code based on the selected school name
  const schoolNames = Object.values(schools);
  const schoolCodes = Object.keys(schools);
  const schoolCode = schoolCodes.find(code => schools[code] === selectedSchoolName);
  message = messages[schoolCode] || '';
  
  // Render the select view with the selected school and message
  res.render('select', {schoolNames, selectedSchoolName, message});
});


// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

