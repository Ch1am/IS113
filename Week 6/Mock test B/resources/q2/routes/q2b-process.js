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
router.post('/',(req,res)=>{
    let people = req.body.person
    let peopleArr = Array.isArray(people) ? people : [people]
    let html = `<!DOCTYPE html>
  <html>
  <body>
  `
  if (people == null){
    html += `<h1>You must select at least one person!</h1>`
  }
  else{
    html+= `<table border="1px"><tr><th>Photo</th><th>Message</th></tr>`
    peopleArr.forEach((x) => {
        html += `<tr><td><img src="/${x}.jpg"></td>`
        html += `<td>${messages[x]}</td></tr>`
    });
    
  }

  res.send(html)

})

// END OF ADDING YOUR CODE

module.exports = router;
