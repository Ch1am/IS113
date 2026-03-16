const express = require('express');

const booksController = require('./../controllers/books-controller');

const router = express.Router(); // sub application

// Define a GET route to display the list of books
router.get("/book-list", booksController.showBooks);

// route for displaying the books to be edited
router.get('/edit-books', booksController.showBookList);
// route for showing a book selected by the user to edit
router.get('/update-book', booksController.getBook);
// route for editing the book and displaying the final message
router.post('/update-book', booksController.updateBook);

// EXPORT
module.exports = router;