// Week 9 - Extra Exercises Solutions - Question 9 - routes/songs-routes.js
// -----------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songs-controller");

// Home page
router.get("/", songsController.home);

// List all songs
router.get("/songs-library", songsController.list);

// Search songs by artist
router.get("/search-songs", songsController.searchGet);
router.post("/search-songs", songsController.searchPost);

// Add a new song
router.get("/add-song", songsController.addGet);
router.post("/add-song", songsController.addPost);

// Edit and Delete placeholders (for now)
router.get("/edit-song", (req, res) => {
  res.render("edit-song-form");
});

router.get("/delete-song", (req, res) => {
  res.render("delete-song-form");
});

// Export the router to be used in server.js
module.exports = router;