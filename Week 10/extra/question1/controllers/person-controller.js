const fs = require('fs/promises');

// Get Service model
const Person = require('./../models/person-model');


// Controller function to get all the documents in the db and display it
exports.searchForm = async (req, res) => {
  res.render('search');  // Render the form
};

exports.searchPerson = async (req, res) => {
  const { gender, min, max } = req.body;
  const minAge = parseInt(min);
  const maxAge = parseInt(max);
  
  try {
    let results = await Person.retrieveByGenderAge(gender, minAge, maxAge);
    res.render('search', { results: results || [] });
  } catch (error) {
    console.error('Error:', error);
    res.render('search', { results: [], error: 'Search failed' });
  }
};
