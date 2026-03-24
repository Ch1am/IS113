// Week 9 - Extra Exercises Solutions - Question 9 - controllers/songs-controller.js
// ---------------------------------------------------------------------------------

const songsModel = require("../models/song-model");

// Home page
// ---------
function home(req, res) {
  res.render("home");
}

// List all songs
// --------------
async function list(req, res) {
  try {
    const songs = await songsModel.getAll();
    res.render("display-songs-form", { error: null, songs });
    console.log(`Displayed ${songs.length} song(s) successfully.`);
  } catch (error) {
    console.error("Error displaying songs:", error);
    res.render("display-songs-form", {
      error: "An error occurred while fetching songs.",
      songs: []
    });
  }
}

// GET: Search songs by artist (show form)
// ---------------------------------------
async function searchGet(req, res) {
  try {
    const artists = await songsModel.getArtists();
    res.render("search-songs-form", {
      error: null,
      songs: null,
      selectedArtist: "",
      artists
    });
  } catch (error) {
    console.error("Error loading search form:", error);
    res.render("search-songs-form", {
      error: "An error occurred while loading the search form.",
      songs: null,
      selectedArtist: "",
      artists: []
    });
  }
}

// POST: Search songs by artist (handle form submission)
// -----------------------------------------------------
async function searchPost(req, res) {
  try {
    // get artist list for dropdown
    const artists = await songsModel.getArtists();

    const selectedArtist = (req.body.artist ?? "").trim();

    if (!selectedArtist) {
      return res.render("search-songs-form", {
        error: "Please select an artist.",
        songs: null,
        selectedArtist: "",
        artists
      });
    }

    const songs = await songsModel.findByArtist(selectedArtist);

    if (songs.length === 0) {
      return res.render("search-songs-form", {
        error: "No songs found for the selected artist.",
        songs: null,
        selectedArtist,
        artists
      });
    }

    res.render("search-songs-form", {
      error: null,
      songs,
      selectedArtist,
      artists
    });

  } catch (error) {
    console.error("Error searching songs:", error);
    res.render("search-songs-form", {
      error: "An error occurred while searching for songs.",
      songs: null,
      selectedArtist: "",
      artists: []
    });
  }
}

// GET: Add a new song (show form)
// -------------------------------
function addGet(req, res) {
  res.render("add-song-form", {
    error: null,
    success: null,
    songData: { artist: "", title: "", lyrics: "" }
  });
}

// POST: Add a new song (handle submission)
// ---------------------------------------
async function addPost(req, res) {
  try {
    const { artist, title, lyrics } = req.body;

    // Trim whitespace safely
    const trimmedArtist = (artist ?? "").trim();
    const trimmedTitle = (title ?? "").trim();
    const trimmedLyrics = (lyrics ?? "").trim();

    // Validate required fields
    if (!trimmedArtist || !trimmedTitle || !trimmedLyrics) {
      return res.render("add-song-form", {
        error: "All fields are required.",
        success: null,
        songData: { artist, title, lyrics }
      });
    }

    // Add song via model
    const result = await songsModel.add({
      artist: trimmedArtist,
      title: trimmedTitle,
      lyrics: trimmedLyrics
    });

    if (!result.success) {
      return res.render("add-song-form", {
        error: result.message,
        success: null,
        songData: { artist, title, lyrics }
      });
    }

    // Success: clear form
    res.render("add-song-form", {
      error: null,
      success: "Song added successfully.",
      songData: { artist: "", title: "", lyrics: "" }
    });
    
  } catch (error) {
    console.error("Error adding song:", error);
    res.render("add-song-form", {
      error: "An error occurred while adding the song.",
      success: null,
      songData: { artist: "", title: "", lyrics: "" }
    });
  }
}

// Export all controller functions
// -------------------------------
module.exports = {
  home,
  list,
  searchGet,
  searchPost,
  addGet,
  addPost
};