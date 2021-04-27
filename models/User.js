'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String},
  books: [bookSchema]
});

const bookSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String},
  require: true
});
