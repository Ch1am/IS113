const express = require('express');

const booksController = require('./../controllers/books-controller');

const router = express.Router(); // sub application

// Define a GET route to display the list of books
router.get("/book-list", booksController.showBooks);

// EXPORT
module.exports = router;