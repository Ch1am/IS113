// Week 9 - Exercise 1 - server.js

const express = require("express"); 
const server = express();

// START YOUR CODE HERE
server.set("view engine", "ejs");

// Define a GET route for the root path "/"
server.get("/", async (req, res) => {
  const results = [];
  const url = "https://api.adviceslip.com/advice";

  // Loop to fetch 5 pieces of advice from the API
  for (let i = 0; i < 5; i++) {
    try {
      // Extract and store the advice text in an array of objects
      const respond = await fetch(url);
      const data = await respond.json();
      console.log(data.slip.advice)
      results.push(data.slip)
     
    } catch (error) {
      // If an error occurs, push a fallback message
      res.status(500).send("Failed to fetch advice.");
    }
  }

  // Render the "query-result" EJS template, passing the advice results to it
  res.render("query-result", { results });
});

// END OF YOUR CODE HERE

const hostname = "localhost"; 
const port = 8000; 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
