const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide valid email'],
  },
  photo: String,
  password: {
    type: String,
    require: true,
    minLength: [10, 'password must be at least 10 characters'],
  },
  passwordConfirm: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
