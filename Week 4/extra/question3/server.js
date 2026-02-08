// Week 4 - Extra Question 3 - server.js
// -------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// START YOUR CODE HERE

server.post('/process-form', (req, res) => {
  const stars = req.body.stars;
  let imagePath = '';
  let outputStr = '';

  if (!stars) {
    res.send(`<h3>OMG nobody selected</h3>`);
  } else if (Array.isArray(stars)) {
    for (let i = 0; i < stars.length; i++) {
      imagePath = `/images/${stars[i]}.jpg`;
      outputStr += `<img src="${imagePath}" alt="${stars[i]}" style="margin-right: 5px;"></li>`;
    }
    res.send(outputStr);
  } else {
    imagePath = `/images/${stars}.jpg`;
    outputStr += `<img src="${imagePath}" alt="${stars}"  >`;
    res.send(outputStr);
  }  

});
// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
