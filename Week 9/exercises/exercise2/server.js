// Week 9 - Exercise 2 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

const blogRoute = require("./routes/blogRoute");
server.use('/blog-posts', blogRoute)


// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
