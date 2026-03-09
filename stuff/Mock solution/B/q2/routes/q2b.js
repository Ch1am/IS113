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

router.get("/", (req, res) => {
  let html = `
      <!DOCTYPE html>
      <html>
      <body>
        <form method="post" action="/q2b-process">
          <table border="1">
            <tr><th>Person</th></tr>
    `;

    for (const key in people) {
      const label = people[key];
      html += `
        <tr>
          <td>
            <input type="checkbox" name="people" value="${key}"> ${label}
          </td>
        </tr>
      `;
    }

    html += `
            <tr><td><input type="submit"></td></tr>
          </table>
        </form>
      </body>
      </html>
    `;

    res.send(html);
});

// END OF ADDING YOUR CODE

module.exports = router;
