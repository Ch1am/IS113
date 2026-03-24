// Week 9 - Extra Exercises Solutions - Question 6 - server.js
// -----------------------------------------------------------

const express = require("express");
const fs = require("fs/promises");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

const filePath = "./data/songs-data.json";

// GET /delete-song : show form
// ----------------------------
server.get("/delete-song", (req, res) => {
  res.render("delete-song-form", {
    error: null,
    success: null,
    formData: { artist: "", title: "" }
  });
});

// POST /delete-song : perform deletion
// ------------------------------------
server.post("/delete-song", async (req, res) => {
  try {
    const artist = (req.body.artist || "").trim();
    const title  = (req.body.title  || "").trim();

    // Validate first
    if (!artist || !title) {
      return res.render("delete-song-form", {
        error: "Both fields are required.",
        success: null,
        formData: { artist, title }
      });
    }

    // Load data
    const raw = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(raw);

    // Find index of song to remove
    const index = songs.findIndex(s => s.artist === artist && s.title === title);
    if (index === -1) {
      return res.render("delete-song-form", {
        error: "Song not found.",
        success: null,
        formData: { artist, title }
      });
    }

    // Delete the song form songs array and save songs array again.
    // songs.splice(index, 1) removes 1 element from the songs array, starting at position index.
    // it returns an array of removed elements
    const deleted_songs = songs.splice(index, 1);
    const deleted_song = deleted_songs[0];
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    console.log(
      `Deleted song:\n` +
      `Artist: ${deleted_song.artist}\n` +
      `Title:  ${deleted_song.title}\n`
    );

    // Show success and clear form
    res.render("delete-song-form", {
      error: null,
      success: "Song deleted successfully.",
      formData: { artist: "", title: "" }
    });
  } catch (err) {
    console.error("Error deleting song:", err);
    res.render("delete-song-form", {
      error: "An error occurred while deleting the song.",
      success: null,
      formData: { artist: "", title: "" }
    });
  }
});

// Start server
const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});