/* 
    Name:  
    Email: 
*/

const express = require("express");
const router = express.Router();

// An object for lookup
const people = {
  trump: "Donald Trump",
  clinton: "Hillary Clinton",
  kim: "Kim Jong Un",
  moon: "Moon Jae In"
};

// ADD YOUR CODE BELOW
router.get("/", (req,res) =>{
  let html = `<!DOCTYPE html>
  <html>
  <body>
  <form method="post" action="/q2b-process">
  <table border="1px">
  <tr><th>Person</th></tr>`

  for (person in people) {
    html += `<tr><td><input type="checkbox" name="person" value="${person}">${people[person]}</td></tr>`
  };
  html += `<tr><td><input type="submit" value="Submit"></td></tr></table></form></body>`
 
  res.send(html)
})

// END OF ADDING YOUR CODE

module.exports = router;
