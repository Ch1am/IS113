// Week 9 - Extra Exercises Solutions - Question 3 - server.js
// -----------------------------------------------------------
const express = require("express");
const server = express();     
const fs = require("fs/promises");

// Middleware to parse URL-encoded bodies and set the view engine to EJS
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// Extract distinct artists
function getUniqueArtists(allSongs) {
  const artists = [];
  allSongs.forEach(song => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  return artists;
}

// Get the songs search form
// --------------------------
server.get("/search-songs", async (req, res) => {
  try{ 
    // Read data from the JSON file
    const filePath = "./data/songs-data.json";
    const rawData = await fs.readFile(filePath, "utf8");
    const allSongs = JSON.parse(rawData);

    // Extract distinct artists
    const artists = getUniqueArtists(allSongs);

    res.render("search-songs-form", { error: null, songs: null, selectedArtist: "", artists });

  } catch (error) {
    console.error("Error loading search page:", error);
    res.render("search-songs-form", { error: "An error occurred while loading the page.", songs: null, selectedArtist: null, artists: [] });
  }
});

// POST Form submission to search for songs
// ----------------------------------------
server.post("/search-songs", async (req, res) => {

  try {
    // retrieve the songs data from the JSON file
    const filePath = "./data/songs-data.json";
    const rawData = await fs.promises.readFile(filePath, "utf8");
    const allSongs = JSON.parse(rawData);

    // Extract distinct artists
    const artists = getUniqueArtists(allSongs);

    // Get the selected artist from the form submission
    const selectedArtist = req.body.artist;

    // If no artist was selected
    if (!selectedArtist) {
      return res.render("search-songs-form", { error: "Please select an artist.", songs: null, selectedArtist: "", artists });
    }

    // Filter songs by the selected artist
    const songs = allSongs.filter(song => song.artist === selectedArtist);

    // Artist selected but no songs in the file
    if (songs.length === 0) {
      return res.render("search-songs-form", { error: "No songs found for the selected artist.", songs: null, selectedArtist, artists });
    } 

    // songs found for the selected artist
    res.render("search-songs-form", { error: null, songs, selectedArtist, artists });
  
  } catch (error) {
    console.error("Error reading songs data:", error);
    res.render("search-songs-form", { error: "An error occurred while searching.", songs: null, selectedArtist: "", artists: [] });
  }
});

const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});