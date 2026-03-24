const express = require('express');

const booksController = require('./../controllers/books-controller');

const router = express.Router(); // sub application


// Define a GET route to display the list of books
router.get("/book-list", booksController.showBooks);

// Define GET/POST route to display search form and submit form
router.get("/search-book", booksController.showForm);
router.post("/search-book", booksController.submitBook);


// EXPORT
module.exports = router;