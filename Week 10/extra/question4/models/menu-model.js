const mongoose = require("mongoose");

// Create a new ‘menu' schema
const menuSchema = new mongoose.Schema({
  sku: {
    type: Number,
    required: [true, "A menu item should have an unique id"],
    unique: true,
  },
  fooddesc: {
    type: String,
    required: [true, "Description of the food item is required"],
  },
  category: {
    type: String,
    required: [true, "Category of the food item is required"],
  },
  price: {
    type: Number,
    required: [true, "Price of food item is required"],
  },
});

const Menu = mongoose.model("Menu", menuSchema, "menu");

// all methods here
// retrieveALL will retrieve all the data in the collection.
exports.retrieveAll = function () {
  //Your code Here
};

// findBySku  will return menu item
exports.findBySku = function (sku) {
  //Your code Here
};

// addMenuItem will take in 4 attributes and create a new record
exports.addMenuItem = function (sku, fooddesc, category, price) {
  //Your code Here
};

// updateMenuItem will take in sku , fooddesc, category and price.
// It will update the food description , category and price based on a certain sku
exports.updateMenuItem = function (sku, fooddesc, category, price) {
  //Your code Here
};

// deleteMenuItem will delete ONE menu item given a certain sku
exports.deleteMenuItem = function (sku) {
  //Your code Here
};
