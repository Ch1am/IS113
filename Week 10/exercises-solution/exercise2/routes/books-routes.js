const express = require('express');

const booksController = require('./../controllers/books-controller');

const router = express.Router(); // sub application


// Define a GET route to display the list of books
router.get("/book-list", booksController.showBooks);

// Define GET/POST route to display search form and submit form
router.get("/search-book", booksController.showForm);
router.post("/search-book", booksController.submitForm);

// Define GET/POST route to display add form and submit form
router.get("/add-book", booksController.showAddForm);
router.post("/add-book", booksController.createBook);


// EXPORT
module.exports = router;