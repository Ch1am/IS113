const express = require('express');

const personController = require('./../controllers/person-controller');

const router = express.Router(); // sub application


// Define a GET route to display the search form
router.get("/search", personController.searchForm);

// to post the result of the search
router.post("/search", personController.searchPerson);








// EXPORT
module.exports = router;