'use strict';
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String},
  required: {type: Boolean}
});

const userSchema = new mongoose.Schema({
  email: {type: String},
  books: [bookSchema]
});

module.exports = mongoose.model('user', userSchema);
