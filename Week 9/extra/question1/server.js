// Week 9 - Extra Exercises Solutions - Question 1 - server.js
// -----------------------------------------------------------
const express = require("express");
const server = express();     
const fs = require("fs/promises");

// Middleware to set the view engine to EJS
server.set("view engine", "ejs");

// to serve static files like images
server.use(express.static("public"));

// Route to render the initial form
// --------------------------------
server.get("/songs-library", async (req, res) => {
  try {
    const filePath = "./data/songs-data.json";
    // Read the JSON file containing songs data
    // Using fs/promises to read the file asynchronously
    // rawData is a string containing the JSON data
    const rawData = await fs.readFile(filePath, "utf8");
    // allSongs is an array of objects from the JSON file
    const allSongs = JSON.parse(rawData);
    
    // render the form with all the songs
    res.render("display-songs-form", { songs: allSongs });
    console.log("Songs data loaded successfully.");

  } catch (error) {
    console.error("Error reading songs data:", error);
    res.render("display-songs-form", { error: "Failed to load songs.", songs: [] });
  }
});

const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});