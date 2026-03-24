// Week 9 - Extra Exercises Solutions - Question 8 - server.js
// -----------------------------------------------------------

const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const server = express();
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static("public")); // for images 

const filePath = "./data/songs-data.json";

// helper function 
// ---------------
function getUniqueArtists(allSongs) {
  const artists = [];
  allSongs.forEach(song => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  // Optional : sorting the array of artists alphabetically
  return artists.sort((a, b) => a.localeCompare(b));
}

// Home Page
// ---------
server.get("/", (req, res) => {
  // header is included directly by the EJS file
  res.render("home");
});

// Q1: List all songs
// ------------------

// Route to render the initial form
server.get("/songs-library", async (req, res) => {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(rawData);

    // render the form with all the songs
    res.render("display-songs-form", { error: null, songs });
    console.log(`Displayed ${songs.length} song(s) successfully.`);

  } catch (err) {
    console.error("Error reading songs data:", err);
    res.render("display-songs-form", { error: "Failed to load songs.", songs: [] });
  }
});

// Q3: Search by artist (dynamic)
// ------------------------------

// Get the songs search form
server.get("/search-songs", async (req, res) => {
  try {
    // Read data from the JSON file
    const rawData = await fs.readFile(filePath, "utf8");
    const allSongs = JSON.parse(rawData);

    // Extract distinct artists
    const artists = getUniqueArtists(allSongs);

    res.render("search-songs-form", {
      error: null,
      songs: null,
      selectedArtist: "",
      artists
    });
  } catch (err) {
    console.error("Error loading search page:", err);
    res.render("search-songs-form", {
      error: "An error occurred while loading the page.",
      songs: null,
      selectedArtist: "",
      artists: []
    });
  }
});

// POST Form submission to search for songs
server.post("/search-songs", async (req, res) => {
  try {
    // retrieve the songs data from the JSON file
    const rawData = await fs.readFile(filePath, "utf8");
    const allSongs = JSON.parse(rawData);

    // Extract distinct artists
    const artists = getUniqueArtists(allSongs);

    // Get the selected artist from the form submission
    const selectedArtist = (req.body.artist || "").trim();

    // If no artist was selected
    if (!selectedArtist) {
      return res.render("search-songs-form", {
        error: "Please select an artist.",
        songs: null,
        selectedArtist: "",
        artists
      });
    }

    // Filter songs by the selected artist
    const songs = allSongs.filter(s => s.artist === selectedArtist);

    // Artist selected but no songs in the file
    if (songs.length === 0) {
      return res.render("search-songs-form", {
        error: "No songs found for the selected artist.",
        songs: null,
        selectedArtist,
        artists
      });
    }

    // songs found for the selected artist
    res.render("search-songs-form", {
      error: null,
      songs,
      selectedArtist,
      artists
    });
    
  } catch (err) {
    console.error("Error searching songs:", err);
    res.render("search-songs-form", {
      error: "An error occurred while searching.",
      songs: null,
      selectedArtist: "",
      artists: []
    });
  }
});

// Q4: Add a song
// --------------

// GET: Display form to add a new song
server.get("/add-song", (req, res) => {
  res.render("add-song-form", {
    error: null,
    success: null,
    songData: { artist: "", title: "", lyrics: "" }
  });
});

// POST: Handle form submission
server.post("/add-song", async (req, res) => {
  try {
    const { artist, title, lyrics } = req.body;

    // Trim whitespace
    const trimmedArtist = (artist ?? "").trim();
    const trimmedTitle  = (title  ?? "").trim();
    const trimmedLyrics = (lyrics ?? "").trim();

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

    const duplicate = songs.find(s => s.artist === trimmedArtist && s.title === trimmedTitle);
    
    if (duplicate) {
      return res.render("add-song-form", {
        error: "This song already exists (same artist and title).",
        success: null,
        songData: { artist, title, lyrics }
      });
    }

    // Add the new song
    songs.push({ artist: trimmedArtist, title: trimmedTitle, lyrics: trimmedLyrics });
    // Write the updated array back to the file
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    console.log(`Added: "${trimmedTitle}" by "${trimmedArtist}" - Lyrics "${trimmedLyrics}" (total songs: ${songs.length})`);

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

// Q5: Edit a song (enter artist & title, then update)
// --------------------------------------------------

// GET /edit-song : Show the initial form
server.get("/edit-song", (req, res) => {
  res.render("edit-song-form", {
    step: "search",
    error: null,
    success: null,
    songData: { artist: "", title: "", lyrics: "" }
  });
});

// POST /edit-song : Load song for editing
server.post("/edit-song", async (req, res) => {
  try {

    const artist = (req.body.artist || "").trim();
    const title  = (req.body.title  || "").trim();

    if (!artist || !title) {
      return res.render("edit-song-form", {
        step: "search",
        error: "Both fields are required.",
        success: null,
        songData: { artist, title, lyrics: "" }
      });
    }

    const raw = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(raw);

    const song = songs.find(s => s.artist.trim() === artist && s.title.trim() === title);
    if (!song) {
      return res.render("edit-song-form", {
        step: "search",
        error: "Song not found.",
        success: null,
        songData: { artist, title, lyrics: "" }
      });
    }

    res.render("edit-song-form", {
      step: "edit",
      error: null,
      success: null,
      songData: song
    });

  } catch (err) {
    console.error("Error reading file:", err);
    res.render("edit-song-form", {
      step: "search",
      error: "An error occurred while loading the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
});

// POST /update-song : Save the updated version
server.post("/update-song", async (req, res) => {
  try {
    const artist        = req.body.artist;
    const originalTitle = req.body.originalTitle;
    const newTitle      = (req.body.newTitle  || "").trim();
    const newLyrics     = (req.body.newLyrics || "").trim();

    if (!newTitle || !newLyrics) {
      return res.render("edit-song-form", {
        step: "edit",
        error: "All fields are required.",
        success: null,
        songData: { artist, title: newTitle, lyrics: newLyrics }
      });
    }

    const raw = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(raw);

    const index = songs.findIndex(s => s.artist === artist && s.title === originalTitle);
    
    if (index === -1) {
      return res.render("edit-song-form", {
        step: "search",
        error: "Song not found.",
        success: null,
        songData: { artist, title: "", lyrics: "" }
      });
    }

    songs[index].title  = newTitle;
    songs[index].lyrics = newLyrics;
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    console.log(
      `Updated song:\n` +
      `Artist: ${artist}\n` +
      `Title: ${newTitle}\n` +
      `Lyrics:\n${newLyrics}\n`
    );

    res.render("edit-song-form", {
      step: "edit",
      error: null,
      success: "Song updated successfully.",
      songData: songs[index]
    });

  } catch (err) {
    console.error("Error updating song:", err);
    res.render("edit-song-form", {
      step: "search",
      error: "An error occurred while updating the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
});

// Q6: Delete a song
// -----------------

// GET /delete-song : show form
server.get("/delete-song", (req, res) => {
  res.render("delete-song-form", {
    error: null,
    success: null,
    formData: { artist: "", title: "" }
  });
});

// POST /delete-song : perform deletion
server.post("/delete-song", async (req, res) => {
  try {
    const artist = (req.body.artist || "").trim();
    const title  = (req.body.title  || "").trim();

    if (!artist || !title) {
      return res.render("delete-song-form", {
        error: "Both fields are required.",
        success: null,
        formData: { artist, title }
      });
    }

    const rawData = await fs.readFile(filePath, "utf8");
    const songs = JSON.parse(rawData);

    const index = songs.findIndex(s => s.artist === artist && s.title === title);
    if (index === -1) {
      return res.render("delete-song-form", {
        error: "Song not found.",
        success: null,
        formData: { artist, title }
      });
    }

    // Delete the song from songs array and save songs array again.
    const deleted_songs = songs.splice(index, 1);
    const deleted_song = deleted_songs[0];
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));

    console.log(`Deleted song:\nArtist: ${deleted_song.artist}\nTitle:  ${deleted_song.title}\n`);

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

// Start the server
// ----------------
const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});