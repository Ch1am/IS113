/* 
    Name:  
    Email: 
*/

const express = require("express");
const router = express.Router();

// Messages dictionary
const messages = {
  trump: "Make America Great Again",
  clinton: "More Women in Office",
  kim: "Nukes Fly High and Far",
  moon: "One Korea One People",
};

// ADD YOUR CODE BELOW

router.post("/", (req, res) => {
  const person = req.body.person;
    let html = "<!DOCTYPE html><html><body>";
    
    if (!person) {
      html += "<h1>You must select a person!</h1>";
    } else {
      const message = messages[person] || "No message found.";
      const image = `${person}.jpg`;

      html = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>${message}</h1>
          <img src="${image}" alt="${person}" style="max-width:300px;">
        </body>
      </html>`;
    }
    res.send(html);
});

// END OF ADDING YOUR CODE

module.exports = router;  
