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
router.post(`/`,(req,res) =>{
    //let userName = req.query.user //this is if using get instead of post
    let person = req.body.person;
    let html = "<!DOCTYPE html><html><body>";

    if (person == ""){
      html += "<h1>You must select a person!</h1>";
    }
    else{
      html += `<h1>${messages[person]}</h1>`
      html += `<img src="${person}.jpg">`
      //<img src="./clinton.jpg">
    }
    html += "</body>"
    res.send(html);
});

// END OF ADDING YOUR CODE

module.exports = router;  
