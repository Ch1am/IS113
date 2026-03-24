const express = require("express");

const statController = require("./../controllers/stat-controller");

const router = express.Router(); // sub application

// Define a GET route to display the search form
router.get("/", statController.displayForm);

// Define a GET route to read the id from the URL and
// display the star info by id

// show update stats form

// create a new record

//edit record

//delete record

// EXPORT
module.exports = router;
