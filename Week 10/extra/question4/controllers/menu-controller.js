//const fs = require("fs/promises");

// Get Service model
const Menu = require("./../models/menu-model");

// function to get all the documents in the db and display it
exports.maintainMenu = async (req, res) => {
  //Your code Here
};

// This function takes in 6 attributes from the form
// returns true if record is successfully created and send a
//success message when done
exports.addNewMenuItem = async (req, res) => {
  //Your code Here
};

// grab sku from the url and use findBySku to display the
// record in the form for editing
exports.retrievesEditItem = async (req, res) => {
  //Your code Here
};

//This function takes in the sku, fooddesc, category and price from the edit form
//and use the method updateMenuItem() to update the record
// for a certain sku.
// returns true and returns a success message

exports.menuUpdate = async (req, res) => {
  //Your code Here
};

// grab sku from the url and use findBySku to display the
// record in the form for deletion
exports.retrieveDeleteItem = async (req, res) => {
  //Your code Here
};
// This function take in a certain ID for deletion
// use deleteMenuItem method to delete the record
// if success, it will res.send ("record has been deleted successfully")
exports.menuDelete = async (req, res) => {
  //Your code Here
};
