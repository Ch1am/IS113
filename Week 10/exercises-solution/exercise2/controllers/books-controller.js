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
exports.submitForm = async (req, res) => {
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
//ShowAddForm is to display the form for user to key in a new book  
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
