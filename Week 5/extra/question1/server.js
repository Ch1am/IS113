// Week 5 - Extra Question 1 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// START YOUR CODE HERE

// Handle GET requests to "/":
server.get('/', (req, res) => {
  // Render the like page with empty bookmark and message
  res.render('like', {bookmarked : '', message : ''}); 
});

// Handle GET requests to "/process-like":
server.get('/process-like', (req, res) => {
  // Extract the feeling and bookmark status from the query parameters  
  const feeling = req.query.feeling;
  const bookmarked = req.query.bookmark ? 'checked' : ''; 
  let message = '';

  // Determine the message based on the feeling and bookmark status
  if (feeling === 'Like') {
    message = 'You liked this!';
  } else if (feeling === 'Haha') {
    message = 'You found this funny!';
  } 
  if (bookmarked) {
    message += ' Bookmarked!';
  }

  // Render the like page with the feeling and bookmark status (contained in message)
  res.render('like', {bookmarked, message}); 
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

