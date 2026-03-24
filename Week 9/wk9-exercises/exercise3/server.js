// Week 9 - Exercise 3 - server.js

const express = require("express"); 
const server = express();

// START YOUR CODE HERE

// Import blogs route definitions from separate route file
const blogsRoutes = require("./routes/blogs-routes"); 

// Middleware to parse URL-encoded form data (from POST requests)
server.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine for rendering dynamic HTML pages
server.set("view engine", "ejs");

// Use the blogs routes for handling all root-based blogs routes (e.g. /blog-posts)
server.use("/", blogsRoutes); 

// END OF YOUR CODE HERE

const hostname = "localhost"; 
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
