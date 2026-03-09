/* 
    Name:  
    Email: 
*/

// DO NOT MODIFY THIS PART

const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));

// END OF DO NOT MODIFY THIS PART

// PART A - ADD YOUR CODE BELOW


// Handle POST requests to /q2a-process
server.post("/q2a-process", (req, res) => {
  // Extract numbers and divisor from the request body
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const num3 = req.body.num3;
  const divisor = req.body.divisor;

  // Store the three numbers in an array
  let numbers = [num1, num2, num3];
  let results = [];

  // Check divisibility of each number and store result as "YES" or "NO"
  numbers.forEach((num) => {
    const status = isDivisibleBy(num, divisor);
    if (status) {
      results.push("YES");
    } else {
      results.push("NO");
    }
  });

  // Build an HTML unordered list to display the results
  let html = "<ul>";
  for (let count = 0; count < numbers.length; count++) {
    html += `<li>${numbers[count]} is divisible by ${divisor}: ${results[count]}</li>`;
  }
  html += "</ul>";

  // Send the generated HTML back as the response
  res.send(html);
});

// Helper function to check if a number is divisible by the divisor
function isDivisibleBy(num, divisor) {
  return num % divisor === 0;
}

// PART A - END OF ADDING YOUR CODE

// ==================================================================

// PART B - ADD YOUR CODE BELOW


// Handle POST requests to /q2b-process
server.get("/q2b-process", (req, res) => {
  // Extract the 'numbers' and 'divisor' query parameters from the URL
  const numbers = req.query.numbers;
  const divisor = req.query.divisor;

  // Split the comma-separated numbers string into an array
  const numbersArr = numbers.split(",");

  let results = [];

  // Check divisibility of each number and store result as "YES" or "NO"
  numbersArr.forEach((num) => {
    const status = isDivisibleBy(num, divisor);
    if (status) {
      results.push("YES");
    } else {
      results.push("NO");
    }
  });

  // Build an HTML unordered list to display the results
  let html = "<ul>";
  for (let count = 0; count < numbersArr.length; count++) {
    html += `<li>${numbersArr[count]} is divisible by ${divisor}: ${results[count]}</li>`;
  }
  html += "</ul>";

  // Send the generated HTML back as the response
  res.send(html);
});

// PART B - END OF ADDING YOUR CODE

// DO NOT MODIFY THIS PART

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// END OF DO NOT MODIFY THIS PART
