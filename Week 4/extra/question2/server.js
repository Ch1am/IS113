// Week 4 - Extra Question 2 - server.js
// -------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

// Serve static files from the 'public' folder
server.use('/', express.static('public'));

// START YOUR CODE HERE

server.get('/process-form', (req, res) => {
  const fruit = req.query.fruit;
  const qty = Number(req.query.quantity);

  let outputStr = '' 

  if (!fruit) {
    res.send(`<h3>You must select a fruit</h3>`);
  } else {
  
    let imagePath = '/images/' + fruit + '.jpg';
    for (let i = 0; i < qty; i++) {
      outputStr += `<img src="${imagePath}" alt="${fruit}" width="100" height="100">`;
    }   

    res.send(outputStr);  
  }
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
