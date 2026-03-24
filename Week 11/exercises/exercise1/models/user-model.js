const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// this cde is to create a User Model
// a model represents the collection in the MongoDB
// and collection is a collection of documents

// The first argument represent the name fo the model
// without the third argument, the cllection will be "user"
const User = mongoose.model('User', UserSchema, 'w11_users');

exports.addUser = function(newUser) {
  return User.create(newUser);
};

exports.findUser = function(username) {
  return User.findOne({ username: username });
};