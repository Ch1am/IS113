// Week 4 - Extra Question 4 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// Pre-defined username/pass combinations
const logins = {
            'donald' : 'trump123',
            'hillary': 'clinton123'
      }

// START YOUR CODE HERE

server.post('/process-form', (req, res) => {
  const username = req.body.username;
  const password = req.body.pass;
  const passConfirm = req.body.passConfirm;
  let outputStr = '';

  // Check if username is provided
  if (username.trim() === '') {
    outputStr += `<h3>Username non-existant or empty</h3>`;
    res.send(outputStr);
    return;
  }
  // Check if username exists in the predefined logins
  if (!logins[username]) {
    outputStr += `<h3>Username does not exist</h3>`;
    res.send(outputStr);
    return;
  }
  // Check if password is provided
  if (password.trim() === '' ) {
    outputStr += `<h3>Password non-existant or empty</h3>`;
    res.send(outputStr);
    return;
  } 
  // Check if password matches the predefined login password
  if (logins[username] !== password) {
    outputStr += `<h3>Wrong password</h3>`;
    res.send(outputStr);
    return;
  } 
  // check if confirm password is provided
  if (passConfirm.trim() === '') {
    outputStr += `<h3>Password confirmation non-existant or empty</h3>`;
    res.send(outputStr);
    return;
  }
  // Check if password confirmation matches the password
  if (passConfirm !== password) {
    outputStr += `<h3>Password and Confirm Password do NOT match</h3>`;
    res.send(outputStr);
    return;
  }

  // If all validations pass, send a success message
  outputStr += `<h1>Wow! Login Successful!</h1>`;  
  res.send(outputStr);

});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
