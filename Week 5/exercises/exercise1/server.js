// Week 5 - Exercise 1 - server.js

const express = require("express");
const server = express();

// START YOUR CODE HERE

// Parse URL-encoded data from POST requests
server.use(express.urlencoded({ extended: true }));

// Handle GET requests to "/register-course"
server.get("/register-course", (req, res) => {
  res.send(`
        <h3>Course Registration</h3>
        <form action="/register-course" method="post">
          Select a Course:
          <select name="course">
            <option value="">--Please select--</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
          <br><br>
          <button type="submit">Register</button>
        </form>
      `);
});

// Handle POST submission to "/register-course"
server.post("/register-course", (req, res) => {
  const course = req.body.course;

  if (!course) {
    res.send(`
        <h3>Error</h3>
        <p>No course selection found!</p>`);
  } else {
    res.send(`
        <h3>Registration Successful</h3>
        <p>You have successfully registered for ${course}!</p>
      `);
  }
});

// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
