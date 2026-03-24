const express = require("express");

const menuController = require("./../controllers/menu-controller");

const router = express.Router(); // sub application

// Define a GET route to display all the menu item
router.get("/", menuController.maintainMenu);

//Define a POST route to accept all the inputs for new menu item
//and creates a new record in database

// Define a get route to retrieves the item for edits.

// // Define a post route to accept the inputs from the form and
// // calls the update operation

//define a get route to retrieve the item for deletion

// define a post route to confirms the item for deletion and
// calls the delete operation

// EXPORT
module.exports = router;
