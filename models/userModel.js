const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password must be same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
