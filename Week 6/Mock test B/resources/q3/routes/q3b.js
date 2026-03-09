/* 
    Name:  
    Email: 
*/

// routes/q3b.js (Modify this file)
const express = require("express");
const router = express.Router();

// A data-driven list for Part B (use this in your EJS to generate the form)
const TRANSPORTS = [
  { id: "bus", label: "Bus", img: "bus.png" },
  { id: "train", label: "Train", img: "train.png" },
  { id: "taxi", label: "Taxi", img: "taxi.png" },
];

// TODO:
// Create routes for /q3b-one
// 1) GET /q3b-one : render q3b-one.ejs with no selections
// 2) POST /q3b-one: retrieve selections, validate, render q3b-one.ejs
// Pass to the view:
// - transports: TRANSPORTS
// - selectedIds: array of selected transport ids (possibly empty)

module.exports = router;
