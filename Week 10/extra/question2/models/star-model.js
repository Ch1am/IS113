const mongoose = require("mongoose");

// Create a new ‘star' schema
const starSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A popstar must have an id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A person must have a name"],
  },
  gender: {
    type: String,
    required: [true, "A person must have gender"],
  },
  photo: {
    type: String,
    required: [true, "A kpop star must have a photo"],
  },
  headline: {
    type: String,
    required: [true, "A article must have a headline"],
  },
});

const Kstar = mongoose.model("Kstar", starSchema, "stars");

// all methods here
// retrieveAll will retrieve all the data in the collection.
exports.retrieveAll = function () {
  return Kstar.find();
};

// findById will return one kpop star by their id
exports.findById = function (id) {
  return Kstar.findOne({ id: id });
};

// editHeadline will take in the id and headline input and
// use updateOne method to update the headline based on the id
exports.editHeadline = function (id, headline) {
  return Kstar.updateOne({ id: id }, { headline: headline }).then(result => {
    return result.modifiedCount > 0;  // True if updated
  });
};
