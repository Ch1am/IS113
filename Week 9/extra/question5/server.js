// Week 9 - Extra Exercises Solutions - Question 5 - server.js
// -----------------------------------------------------------

const express = require("express");
const fs = require("fs/promises");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

const filePath = "./data/songs-data.json";

// GET /edit-song : Show the initial form
// --------------------------------------
server.get("/edit-song", (req, res) => {
  res.render("edit-song-form", {
    step: "search",
    error: null,
    success: null,
    songData: { artist: "", title: "", lyrics: "" }
  });
});


// POST /edit-song : Load song for editing
// ----------------------------------------
server.post("/edit-song", async (req, res) => {
  try {
    const { artist, title } = req.body;

    // Validation
    if (!artist.trim() || !title.trim()) {
    return res.render("edit-song-form", {
        step: "search",
        error: "Both fields are required.",
        success: null,
        songData: { artist: artist || "", title: title || "", lyrics: "" }
    });
    }

    const rawData = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(rawData);

    const song = songs.find(
      s => s.artist.trim() === artist.trim() && 
      s.title.trim() === title.trim()
    );

    if (!song) {
      return res.render("edit-song-form", {
        step: "search",
        error: "Song not found.",
        success: null,
        songData: { artist: artist || "", title: title || "", lyrics: "" }
      });
    }

    res.render("edit-song-form", {
      step: "edit",
      error: null,
      success: null,
      songData: song
    });

  } catch (error) {
    console.error("Error reading file:", error);
    res.render("edit-song-form", {
      step: "search",
      error: "An error occurred while loading the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
});


// POST /update-song : Save the updated version
// --------------------------------------------
server.post("/update-song", async (req, res) => {
  try {
    const { artist, originalTitle, newTitle, newLyrics } = req.body;

    const nextTitle  = (newTitle  || "").trim();
    const nextLyrics = (newLyrics || "").trim();

    if (!nextTitle || !nextLyrics) {
      return res.render("edit-song-form", {
        step: "edit",
        error: "All fields are required.",
        success: null,
        songData: { artist, title: nextTitle, lyrics: nextLyrics }
      });
    }

    const rawData = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(rawData);

    const index = songs.findIndex(
      s => s.artist === artist && s.title === originalTitle
    );

    if (index === -1) {
      return res.render("edit-song-form", {
        step: "search",
        error: "Song not found.",
        success: null,
        songData: { artist, title: "", lyrics: "" }
      });
    }

    // Update title & lyrics (even if title didn't actually change)
    songs[index].title = nextTitle;
    songs[index].lyrics = nextLyrics;

    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    // Condole message
    console.log(
      `Updated song:\n` +
      `Artist: ${artist}\n` +
      `Title: ${nextTitle}\n` +
      `Lyrics:${nextLyrics}\n`
    );

    res.render("edit-song-form", {
      step: "edit",
      error: null,
      success: "Song updated successfully.",
      songData: songs[index]
    });

  } catch (error) {
    console.error("Error updating file:", error);
    res.render("edit-song-form", {
      step: "search",
      error: "An error occurred while updating the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
});

// Start server
const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});