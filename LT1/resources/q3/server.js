/*
  Name: Marcus Chiam Hao Yi
  Email: marcuschiam.2025
*/

/* START - DO NOT MODIFY  */
const express = require('express');
const path = require('path');
const server = express();

const hostname = '127.0.0.1';
const port = 8000;

server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));
server.set('view engine', 'ejs');

// Data
const courses = [
  {
    courseCode: "COR2100", title: "Economics & Society", 
    slots: {
      Monday: ["12:00pm", "15:30pm"],
      Tuesday: ["08:15am", "12:00pm"],
      Wednesday: ["08:15am", "15:30pm"],
      Thursday: ["12:00pm", "15:30pm"],
      Friday: ["12:00pm"]
    },
  },
  {
    courseCode: "IS112", title: "Data Management", 
    slots: {
      Monday: ["08:15am", "12:00pm", "15:30pm"],
      Tuesday: ["08:15am", "15:30pm"],
      Wednesday: ["08:15am", "12:00pm", "15:30pm"],
      Thursday: ["15:30pm"],
      Friday: ["08:15am"]
    },
  },
  {
    courseCode: "IS113", title: "Web Application Development I", 
    slots: {
      Monday: ["08:15am", "15:30pm"],
      Tuesday: ["12:00pm", "15:30pm"],
      Wednesday: ["08:15am", "15:30pm"],
      Thursday: ["15:30pm"],
      Friday: ["08:15am"]
    },
  },
  {
    courseCode: "IS114", title: "Computing Fundamentals", 
    slots: {
      Monday: ["12:00pm", "15:30pm"],
      Tuesday: ["12:00pm", "15:30pm"],
      Wednesday: ["08:15am", "12:00pm", "15:30pm"],
      Thursday: ["08:15am"],
      Friday: ["08:15am", "12:00pm"]
    }
  }
];

// Route to root
server.get('/', (req, res) => {
  res.send(`<a href="/courses">Q3</a>`);
});

// Route for Part 1
server.get('/courses', (req, res) => {

  res.render('courses', { courses });
});
/* END - DO NOT MODIFY  */


// Route for Part 2
server.get('/register', (req, res) => {
  // Add/Modify Code Here
  const selectedRaw = req.query.course 
  const selectedCourse = Array.isArray(selectedRaw)  ? selectedRaw : [selectedRaw];
  const allowed = new Set(
    courses.map(t => t.courseCode)
  );
  const selectedIds = selectedCourse.filter(courseCode => allowed.has(courseCode));
    const selected = courses.filter(
    t => selectedIds.includes(t.courseCode)
  );

  res.render('register', { selected} );
} );

// Route for Part 3
server.get('/summary', (req, res) => {
  // Add/Modify Code Here


  res.render('summary', { } );
} )


// Start server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});