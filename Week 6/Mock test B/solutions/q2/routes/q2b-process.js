/* 
    Name:  
    Email: 
*/

const express = require("express");
const router = express.Router();

// Messages lookup
const messages = {
  trump: "Make America Great Again",
  clinton: "More Women in Office",
  kim: "Nukes Fly High and Far",
  moon: "One Korea One People",
};

// ADD YOUR CODE BELOW

router.post("/", (req, res) => {
  const people = req.body.people;
  let html = "<!DOCTYPE html><html><body>";

  if (!people) {
    html += "<h1>You must select at least one person!</h1>";
  } else {
    const selected = Array.isArray(people) ? people : [people];
    html += `
        <table border='1'>
          <tr>
            <th>Photo</th>
            <th>Message</th>
          </tr>
      `;

    for (const person of selected) {
      html += `
          <tr>
            <td><img src='${person}.jpg'></td>
            <td>${messages[person]}</td>
          </tr>
        `;
    }

    html += "</table>";
  }

  html += "</body></html>";
  res.send(html);
});

// END OF ADDING YOUR CODE

module.exports = router;
