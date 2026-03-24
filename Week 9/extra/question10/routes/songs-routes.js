// Week 9 - Extra Exercises Solutions - Question 10 - routes/songs-routes.js
// ------------------------------------------------------------------------

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

// Edit (Q10)
router.get("/edit-song", songsController.editGet);        // show search form
router.post("/edit-song", songsController.editLoadPost);  // load song into edit mode
router.post("/update-song", songsController.updatePost);  // save updates

// Delete (Q10)
router.get("/delete-song", songsController.deleteGet);    // show delete form
router.post("/delete-song", songsController.deletePost);  // perform deletion

// Export the router to be used in server.js
module.exports = router;