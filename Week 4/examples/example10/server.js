// Week 4 - Example 10 - server.js

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")))

// Parse URL-encoded data from POST requests
server.use(express.urlencoded({ extended: true }));

// Comment the code below and  uncomment the code from line 23 to 35,
// to test for code with form validation
// Route to handle POST form data
server.post("/process-form", (req, res) => {
  const topics = req.body.topics;
  res.send(`Topics you like: 
              ${topics.join(", ")}`);
});

// Uncomment the code below to test for code with form validation
// Route to handle POST form data
// server.post("/process-form", (req, res) => {
//   const topics = req.body.topics;
//   if (!topics) {
//     // When there is no selection
//     res.send("You did not select any topics.");
//   } else if (Array.isArray(topics)) {
//     // When there are multiple selections
//     res.send(`You selected multiple topics: ${topics.join(", ")}`);
//   } else {
//     // When only a single selection is made
//     res.send(`You selected a single topic: ${topics}`);
//   }
// });

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
