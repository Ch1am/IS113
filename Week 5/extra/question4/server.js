// Week 5 - Extra Question 4 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

const quotes = [
    "Life is not fair, get used to it. -- Bill Gates",
    "When something is important enough, you do it even if the odds are not in your favor. -- Elon Musk",
    "Great things in business are never done by one person. They're done by a team of people. - Steve Jobs",
    "You never lose a dream. It just incubates as a hobby. -- Larry Page",
    "Seriously! I worry for you! -- Master Lee Y. L.",
    "Team Spirit. You Live I Live. You Die I Live. -- Krazy Korean Woman",
    "If you judge people, you have no time to love them. -- Mother Teresa"
];

// START YOUR CODE HERE

// Handle GET requests to "/"
server.get('/', (req, res) => { 
  // At the beginning we want to display the closed cookie
  let openOrClosed = 'closed';
  // Render the index view with quotes
  res.render('index', {openOrClosed, message: ''}); 
});


// Handle POST requests to "/process"
server.post('/process', (req, res) => { 
  // the cookie should now be open
  let openOrClosed = 'open';
  //let's generate a random quote (random integer number between 0 and quotes.length - 1)
  const randomIndex = Math.floor(Math.random() * quotes.length);
  // select a random quote from the quotes array
  const message = quotes[randomIndex];

  // Render the index view with the selected cookie status and quote
  res.render('index', { openOrClosed, message });

});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
