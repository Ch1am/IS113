// Week 9 - Exercise 1 - server.js

const express = require("express"); 
const server = express();

// START YOUR CODE HERE
server.set("view engine", "ejs");

// Define a GET route for the root path "/"
server.get("/", async (req, res) => {
  const results = [];

  // Loop to fetch 5 pieces of advice from the API
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json(); 
      // Extract and store the advice text in an array of objects
      results.push({
        advice: data.slip.advice 
      });
    } catch (error) {
      // If an error occurs, push a fallback message
      results.push({ advice: "Failed to fetch advice." });
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
