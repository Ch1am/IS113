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
// showForm is to show the search form
exports.showForm = async (req, res) => {
    let result= "";
     res.render("search", {result}); // Render the EJS form view and pass the posts
 
};

// submitBook is to get the isbn from the user input and return the result
exports.submitBook = async (req, res) => {
  const isbnNo = req.body.isbn; // Get isbn from form input
  console.log(isbnNo);
  //Redirect back to form if title or content is missing
  if (!isbnNo){
     res.redirect("/search-book");
     return;
  } 

  try {
    //find() always return an Array of result
    //findOne will return 1 document
    //let result= await Book.find({isbn:isbnNo});// find a book with isbn number
    let result= await Book.findByIsbn(isbnNo);// find a book with isbn number
    //console.log(result);
    //console.log(result.title);
    res.render("search", {result:result ||null}); 
  } catch (error) {
    console.error(error);
   
  }
};
// 
exports.showAddForm = async (req, res) => {
    let result= "";
    let msg=""
     res.render("add-book", {result, msg}); // Render the EJS form view and pass the posts
 
};

exports.createBook = async (req, res) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const rating = req.body.rating;
  const price = req.body.price;
  
 
  //do some form validation here
  if (title=="" || isbn=="" || rating=="" || price==""){
     //res.redirect("/add-book");
     let result="";
     let msg="All fields are required."
      res.render("add-book", {result,msg}); 
     return;
  } 

  //create a newbook
  let newBook = {
    title: title,
    isbn: isbn,
    rating: rating,
    price: price
  };
  //console.log(newBook);
  try {
    let msg="";
    let result= await Book.addBook(newBook);// create new book  
    console.log("mylog:" +result);
     res.render("add-book", {result:result ||null, msg}); 

  } catch (error) {
    console.error(error);
    let result="fail";
    let msg=""; //added as result will not be returned when the operation is not successful
    res.render("add-book", {result,msg}); 
   
  }
};

// These 3 functions for update. 
// showBookList function is similar to showBook but it has an edit button
exports.showBookList = async (req, res) => {
  try {
    let books = await Book.retrieveAll();// fetch all the list    
    
    res.render("edit-book", { books }); // Render the EJS form view and pass the posts
  } catch (error) {
    console.error(error);
    res.send("Error reading database"); // Send error message if fetching fails
  }
};

// this function gets the isbn passed in the url to update-book. e.g update-book?isbn=1234567
// and find and display the book allowing edits to the rating and price of the book
exports.getBook = async (req, res) => {
  const isbnNo = req.query.isbn; // Get isbn from url
  console.log(isbnNo);

  try {
    let result= await Book.findByIsbn(isbnNo);// find a book with isbn number
 
    res.render("update-rating", {result:result ||null}); 
  } catch (error) {
    console.error(error);
   
  }
};

// this function gets the isbn ,rating and price from the update-rating form and 
// calls the update function to update the rating and price given the isbn Number
exports.updateBook = async (req, res) => {
  const isbnNo= req.body.isbn; //in the hidden field.
  const newRating = req.body.rating; 
  const newPrice= req.body.price;
  
  try {

    let success= await Book.editBook (isbnNo,newRating,newPrice);
    console.log(success); // check out the console.log
    res.send("Book has been successfully updated.")
  } catch (error) {
    console.error(error);
   
  }
};
