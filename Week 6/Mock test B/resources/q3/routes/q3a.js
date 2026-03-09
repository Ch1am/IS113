/* 
    Name:  
    Email: 
*/

// routes/q3a.js (Modify this file)
const express = require("express");
const router = express.Router();

// A data-driven list for Part A (use this in your EJS to generate output from the user's selections)
const TRANSPORTS = [
  { id: "bus", label: "Bus", img: "bus.png" },
  { id: "train", label: "Train", img: "train.png" },
  { id: "taxi", label: "Taxi", img: "taxi.png" },
];

// TODO:
// Create a POST route /q3a-display that:
// 1) retrieves selected options from req.body
// 2) validates: if none selected, render q3a-display.ejs with an empty selection
// 3) otherwise pass selected options to q3a-display.ejs

module.exports = router;
