/*
  Name: Marcus Chiam Hao Yi
  Email: marcuschiam.2025
*/


const express = require("express");
const server = express();
const PORT = 8000;

// Serve static files from "public" folder
server.use(express.static("public"));

// Parse URL-encoded form data (for POST requests)
server.use(express.urlencoded({ extended: true }));

// ============================================================
// generateEmail(fullName, domain)
// Given a full name and an email domain, returns the email
// address following the specified rules.
// ============================================================
function generateEmail(fullName, domain) {

    // YOUR CODE HERE
    fullName = `${fullName}`
    fullName = fullName.trim();
    fullName = fullName.replaceAll("-","")
    fullName = fullName.replaceAll("'","")
    let namearr = fullName.split(" ");

    let firstName = namearr[0][0]
    let lastName = namearr[namearr.length-1]
    let userName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`
    let newAdress = `${userName}@${domain}`
    return newAdress;
}

// ============================================================
// Part A – POST /q2a-process
// Receives three full names and a domain, returns generated
// email addresses in an unordered list.
// ============================================================
server.post("/q2a-process", (req, res) => {
    // YOUR CODE HERE

    const fname1 = req.body.fname1;
    const fname2 = req.body.fname2;
    const fname3 = req.body.fname3;
    const domain = req.body.emaildom;
    const usernameArr = [fname1,fname2,fname3]

    let html = "<!DOCTYPE html><html><body><h1>Generated Email Addresses</h1><ul>";
    for (let count = 0; count < 3; count++) {
        console.log(usernameArr[count]);
        html += `<li>${usernameArr[count]}: ${generateEmail(usernameArr[count],domain)}</li>`;
    }
    html += "</ul></body></html>";

    // Send the generated HTML back as the response
    res.send(html);

});

// ============================================================
// Part B – GET /q2b-process
// Receives a comma-delimited list of full names and a domain,
// generates email addresses, and returns the list plus a summary.
// ============================================================
server.get("/q2b-process", (req, res) => {
    // YOUR CODE HERE   
    const fname = req.query.fname;
    const domain = req.query.emaildom;
    const usernameArr = fname.split(",")

    let html = "<!DOCTYPE html><html><body><h1>Generated Email Addresses</h1><ul>";
    for (let count = 0; count < usernameArr.length; count++) {
        console.log(usernameArr[count]);
        html += `<li>${usernameArr[count]}: ${generateEmail(usernameArr[count],domain)}</li>`;
    }
    html+= `</ul><p>Generated ${usernameArr.length} emails(s).</p>`;
    html += "</body></html>";

    // Send the generated HTML back as the response
    res.send(html);
});

// ============================================================
// Start the server
// ============================================================
server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
