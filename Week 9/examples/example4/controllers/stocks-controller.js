const Stock = require("../models/stock-model");

let selectedCategory = "";
let filteredItems = {};

exports.displayForm = (req, res) => {
  res.render("display-form", {
    selectedCategory: selectedCategory || null,
    filteredItems: selectedCategory ? filteredItems : null,
  });
};

exports.handleSubmission = async (req, res) => {
  selectedCategory = req.body.category;

  try {
    const items = await Stock.getAllRecords();

    filteredItems = {};
    for (const key in items) {
      if (items[key] === selectedCategory) {
        filteredItems[key] = items[key];
      }
    }

    res.render("display-form", {
      selectedCategory: selectedCategory || null,
      filteredItems: selectedCategory ? filteredItems : null,
    });
  } catch (error) {
    console.error("Error reading data:", error);
  }
};
