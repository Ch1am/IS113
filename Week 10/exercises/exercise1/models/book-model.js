const mongoose = require('mongoose');

// Create a new ‘book' schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title']
        
    },
    isbn: {
        type: String,
        required: [true, 'A book must have a isbn call number'],
        unique: true
    },
    rating: {
        type: Number,
        default: 3.0
    },
    price: {
        type: Number,
        required: [true, 'A book must have a price']
    }
});

const Book = mongoose.model('Book', bookSchema,'books');

//Methods here

exports.retrieveAll = function() {

  return Book.find();
};


exports.addBook = function(newBook) {
    return Book.create(newBook);
};

exports.findByIsbn = function(isbn) {
    // the key 'isbn' refer to the field in books collection
    return Book.findOne({isbn : isbn})
};

// Update operation
exports.editBook = function( isbn, rating, price ) {
    // will update the rating and price of the book with the given isbn number
    return Book.updateOne( {isbn}, { rating, price}  )
}


// //to test that the data can be inserted into mongoDB
// async function test() {
//     try {
//         let result = await exports.addBook( { title: 'test4', isbn: '1111', rating: 2, price: 50 })
//         //let result = await exports.addBook( { title: 'test4', rating: 2, price: 50 })
//         console.log(result)
//     } catch(error) {
//         console.log(`Error in adding book: ${error}`)
//     }
// }

// test()
