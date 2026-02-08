// Week 4 - Extra Question 8 Solution - server.js
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

// Endpoint to process bus fare calculation
server.post('/bus-fare', (req, res) => {
  // retrieve data input data 
  const distance = parseFloat(req.body.distance);
  const ageGroup = req.body.ageGroup; 
  const time = req.body.time;
  let fare = 0;

  // Validate distance input
  if (isNaN(distance) || distance < 0) {
    res.send('<h3>Distance must be an integer or float</h3>');
    return;
  }

  // calculate fare based on distance, age group, and time
  if (time === 'Peak') {
    fare = distance * 0.15; // regular fare
  } else {
    fare = distance * 0.1; // non-peak fare
  }
  if (ageGroup === 'children') {  
    fare *=  0.5; // children discount
  } else if (ageGroup === 'senior') {
    fare *= 0.75; // senior discount
  } 
  // Display on Web Browser the result
  res.send(`<h3>Bus fare: $${fare.toFixed(2)}</h3>`);
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
