const mongoose = require('mongoose');

// Create a new ‘person' schema
const personSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'A person must have an id'],
        unique: true
        
    },
    name: {
        type: String,
        required: [true, 'A person must have a name']
        
    },
    gender: {
        type: String,
        required: [true, 'A person must have gender']
    },
    age: {
        type: Number,
        required: [true, 'A person must have age']
    }
});

const Person = mongoose.model('person', personSchema,'person');

exports.retrieveAll = function() {
  return Person.find();
};

exports.retrieveByGenderAge = function(genders,minAge,maxAge) {
    // your code here
    let query = { age: { $gte: minAge, $lte: maxAge } };
    
    if (genders !== 'any') {
        query.gender = genders;
    }
    
    return Person.find(query);
};