// Week 9 - Extra Exercises Solutions - Question 2 - server.js
// -----------------------------------------------------------
const express = require("express");
const server = express();     
const fs = require("fs/promises");

// Middleware to parse URL-encoded bodies and set the view engine to EJS
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// Get the songs search form
// -------------------------
server.get("/search-songs", (req, res) => {
  res.render("search-songs-form", { error: null,  songs: null, selectedArtist: "" });
});

// POST Form submission to search for songs
// ----------------------------------------
server.post("/search-songs", async (req, res) => {
  
  // Get the selected artist from the form submission
  const selectedArtist = req.body.artist;

  // Check if an artist was selected
  if (!selectedArtist) {
    return res.render("search-songs-form", { error: "Please select an artist.", songs: null, selectedArtist: "" });
  }

  try {
    const filePath = "./data/songs-data.json";
    const rawData = await fs.readFile(filePath, "utf8");
    const allSongs = JSON.parse(rawData);

    // Filter songs by the selected artist
    const songs = allSongs.filter(song => song.artist === selectedArtist);

    // Artist selected but no songs in the file
    if (songs.length === 0) {
      return res.render("search-songs-form", { error: "No songs found for the selected artist.", songs: null, selectedArtist: selectedArtist });
    } else {
      // songs found for the selected artist
      res.render("search-songs-form", { error: null, songs, selectedArtist });
    }
  } catch (error) {
    console.error("Error reading songs data:", error);
    res.render("search-songs-form", { error: "An error occurred while fetching songs.", songs: null, selectedArtist: null });
  }
});

const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});