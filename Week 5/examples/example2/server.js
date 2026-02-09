// Week 5 - Example 2 - server.js

const express = require("express");
const server = express();

// Route to serve HTML form and handle the form 
// submission when accessing "/text-form"
server.get("/text-form", (req, res) => {
  const fullName = req.query.fullName;

  // If fullName is undefined (on first load), 
  // show the HTML form using template literals.
  if (fullName === undefined) {
    res.send(`
          <form action="/text-form" method="get">
            Enter your name:
            <input type="text" name="fullName">
            <button type="submit">Send</button>
          </form>
       `);
    // Otherwise (when the form submission is received), 
    // respond with a customised welcome message.
  } else {
    res.send(`Hi ${fullName}. Welcome to IS113!`);
  }
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
