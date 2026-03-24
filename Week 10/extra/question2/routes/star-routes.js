const express = require("express");

const starController = require("./../controllers/star-controller");

const router = express.Router(); // sub application

// Define a GET route to display the search form
router.get("/display", starController.displayForm);

// Define a GET route to read the id from the URL and
// display the star info by id
router.get("/edit-star", starController.getStar);

// Define a Post route to gather the id and headline from /edit-star
// update database and show update success/not successful status.
router.post("/update-headline", starController.updateHeadline);

// EXPORT
module.exports = router;
