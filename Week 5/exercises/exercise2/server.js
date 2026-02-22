// Week 5 - Exercise 2 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE

// Set view engine to EJS
server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded({ extended: true }));

// Handle GET requests to "/register-course"
server.get("/register-course", (req, res) => {
  // Define per-request variables
  const course = "";
  const courseType = "";
  const errors = [];

  // When accessing the form for the first time, we pass in:
  // - course and courseType as an empty string
  // - an empty array for errors
  res.render("register-form", {courseType, course, errors});
});

// Handle POST submission to "/register-course"
server.post("/register-course", (req, res) => {
// Extract submitted values
  const course = req.body.course;
  const courseType = req.body.courseType;

  // Prepare an array to collect validation messages
  const errors = [];

  // Validate course selection
  if (course == "") {
    errors.push("Please select a course.");
  }
  // Validate course Type selection
  if (courseType == undefined) {
    errors.push("Please select a course type.");
  }

  // Re-render the form with previously entered values and error messages
  res.render("register-form", { course, courseType, errors });
});

// END OF YOUR CODE HERE
const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
