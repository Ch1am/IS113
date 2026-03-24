// Week 9 - Extra Exercises Solutions - Question 4 - server.js
// -----------------------------------------------------------

const express = require("express");
const server = express();
const fs = require("fs/promises");

// Middleware
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// Path to the JSON data file
const filePath = "./data/songs-data.json";

// GET: Display form to add a new song
// -----------------------------------
server.get("/add-song", (req, res) => {
  res.render("add-song-form", { error: null, success: null, songData: { artist: "", title: "", lyrics: "" } });
});

// POST: Handle form submission
// ----------------------------
server.post("/add-song", async (req, res) => {
  try {
    const { artist, title, lyrics } = req.body;

    // Trim whitespace
    const trimmedArtist = artist.trim();
    const trimmedTitle = title.trim();
    const trimmedLyrics = lyrics.trim();

    // Validate required fields
    if (!trimmedArtist || !trimmedTitle || !trimmedLyrics) {
      return res.render("add-song-form", {
        error: "All fields are required.",
        success: null,
        songData: { artist, title, lyrics }
      });
    }

    // Read the JSON data
    const rawData = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(rawData);

    // Check for duplicates (same artist + title)
    const duplicate = songs.find(
      s => s.artist === trimmedArtist && s.title === trimmedTitle
    );

    if (duplicate) {
      return res.render("add-song-form", {
        error: "This song already exists (same artist and title).",
        success: null,
        songData: { artist, title, lyrics }
      });
    }

    // Add the new song
    const newSong = { artist: trimmedArtist, title: trimmedTitle, lyrics: trimmedLyrics };
    songs.push(newSong);

    // Write the updated array back to the file
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    console.log(`Added: "${trimmedTitle}" by "${trimmedArtist}" - Lyrics "${trimmedLyrics}" (total songs: ${songs.length})`);

    // Render success message and clear form
    res.render("add-song-form", {
      error: null,
      success: "Song added successfully.",
      songData: { artist: "", title: "", lyrics: "" }
    });

  } catch (error) {
    console.error("Error writing to file:", error);
    res.render("add-song-form", {
      error: "An error occurred while adding the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
});

const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});