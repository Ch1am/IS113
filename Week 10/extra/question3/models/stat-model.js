const mongoose = require("mongoose");

// Create a new ‘employment' schema
const employmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A page must have an unique id"],
    unique: true,
  },
  year: {
    type: String,
    required: [true, "Year of graduation is required"],
  },
  university: {
    type: String,
    required: [true, "University name required"],
  },
  school: {
    type: String,
    required: [true, "school name is required"],
  },
  degree: {
    type: String,
    required: [true, "degree name is required"],
  },
  employment_rate: {
    type: String,
    required: [true, "employment rate is required"],
  },
  salary: {
    type: String,
    required: [true, "salary is required"],
  },
});

const Estat = mongoose.model("Estat", employmentSchema, "employmentStat");

// all methods here
// retrieveALL will retrieve all the data in the collection.
exports.retrieveAll = function () {
  // Your Code Here
};

// findByUni  will return all records for a certain university
exports.findByUni = function (uni) {
  // Your Code Here
};

// addStat will take in 7 attributes and create a new record
exports.addStat = function (
  id,
  year,
  uni,
  school,
  degree,
  employment_rate,
  salary,
) {
  // Your Code Here
};

// update stat will take in id , employment_rate and salary.
// It will update the empolyment_rate and salary based on a certain id
exports.updateStat = function (id, employment_rate, salary) {
  // Your Code Here
};

// deleteStat will delete ONE record given a certain ID
exports.deleteStat = function (id) {
  // Your Code Here
};
