const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema, 'w11_users');

exports.addUser = function(newUser) {
  return User.create(newUser);
};

exports.findUser = function(username) {
  return User.findOne({ username: username });
};