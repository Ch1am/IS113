const fs = require('fs/promises');

// Get Service model
const Book = require('./../models/book-model');


// Controller function to get all the documents in the db and display it
exports.showBooks = async (req, res) => {
  try {
    let bookList = await Book.retrieveAll();// fetch all the list    
    console.log(bookList);
    res.render("display-book", { bookList }); // Render the EJS form view and pass the posts
  } catch (error) {
    console.error(error);
    res.send("Error reading database"); // Send error message if fetching fails
  }
};

exports.showBookList = async (req,res) => {
  try{
    let bookList = await Book.retrieveAll()
    res.render("edit-book",{bookList})

  } catch(error){
    console.error(error)
    res.send("Error reading database")//send error if fetching from db fails
  }
}

exports.getBook = async(req,res ) =>{
  let isbn = req.query.isbn
  try{
    let book = await Book.findByIsbn(isbn)

    res.render('update-rating',{result:book})
  } catch(error){
    console.error('error')
  }
}

exports.updateBook = async (req, res) => {

  let newRating = req.body.rating;
  let newPrice = req.body.price;
  let isbn = req.body.isbn;

  try {

    let result = await Book.editBook( isbn, newRating, newPrice );
    console.log(result);

    res.send("Book successfully update!")
  } catch(error) {
    res.send("error in updateBook")
  }

  // res.send("in addBook")
}


