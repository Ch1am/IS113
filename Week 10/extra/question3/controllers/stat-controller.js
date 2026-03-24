const fs = require("fs/promises");

// Get Service model
const Estat = require("./../models/stat-model");

// Controller function to get all the documents in the db and display it
exports.displayForm = async (req, res) => {
  // Your Code Here
};

// gather the uniName from the display.ejs and use the
// method findByUni(uni) to filter by university.
// render display.ejs with the new results.
exports.filterByUni = async (req, res) => {
  // Your Code Here
};

// This function takes in 6 attributes from the form
// call retieveAll() method to check the last record number
// and create a new ID number(totalrecord.length +1)
// puts in the 7 attributes into the addStat() method
// returns true if record is successfully created and send a
//res.send("record has been successfully created") when done.
exports.createRecord = async (req, res) => {
  // Your Code Here
};

//This function takes in the id, employment_rate and salary from the update form
//and use the method updateStat() to update the values of empolyment_rate and salary
// for a certain ID.
// returns true and res.send("record updated successfully")

exports.editRecord = async (req, res) => {
  // Your Code Here
};

// This function take in a certain ID for deletion (from the URL)
// use deleteStat method to delete the record
// if success, it will res.send ("record has been deleted successfully")
exports.deleteRecord = async (req, res) => {
  // Your Code Here
};

// this function creates a new array that stores the
//university name, the average employment rate and average salary per school
// renders the result in average.ejs
exports.displayAvg = async (req, res) => {
  // Your Code Here
};
