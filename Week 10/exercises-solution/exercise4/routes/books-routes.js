const express = require('express');

const booksController = require('./../controllers/books-controller');

const router = express.Router(); // sub application


// Define a GET route to display the list of books
router.get("/book-list", booksController.showBooks);

// Define GET/POST route to display search form and submit form
router.get("/search-book", booksController.showForm);
router.post("/search-book", booksController.submitBook);

// Define GET/POST route to display add form and submit form
router.get("/add-book", booksController.showAddForm);
router.post("/add-book", booksController.createBook);

// Define GET/POST route to display all books/edit one book and update result
router.get("/edit-books", booksController.showBookList);
router.get("/update-book", booksController.getBook);
router.post("/update-book", booksController.updateBook);

// Define GET/POST route to display all books/edit one book and update result
router.get("/delete-book", booksController.getMarkedBook);
router.post("/delete-book", booksController.deleteABook);


// EXPORT
module.exports = router;