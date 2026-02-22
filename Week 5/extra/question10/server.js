// Week 5 - Extra Question 10 - server.js
// --------------------------------------

const express = require('express');
const path = require('path');
const app = express();

const hostname = 'localhost';
const port = 8000;

// To parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Data: emoji flags + PNG images
const destinations = [
  { name: "Paris", flag: "🇫🇷", image: "paris.png", activities: ["Eiffel Tower tour", "River cruise", "Wine tasting"] },
  { name: "Bali", flag: "🇮🇩", image: "bali.png", activities: ["Beach day", "Surfing", "Temple visit"] },
  { name: "Tokyo", flag: "🇯🇵", image: "tokyo.png", activities: ["Sushi tasting", "City tour", "Anime district walk"] }
];

// START YOUR CODE HERE





// END YOUR CODE HERE

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});