'use strict';


//=================Dependencies============
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

//=================Application setup============
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const Book = require('./modules/Book');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('mongoose is connected');
});

app.get('/books', Book.getAllBooks);

app.post('/books', Book.createBook);

app.delete('/books/:index', Book.deleteBook);

app.put('/books/:index', Book.updateBook);

const User = require('./models/User');

//==================Seed Data===============

const Rinat = new User({email: 'phony@email.com', books: [{
  name:'The Dispossesed',
  status: 'Used'
},{
  name: 'To the Lighthouse',
  status: 'New'
},{
  name: 'Harry Potter and the Chamber of Secrets',
  status: 'Beat up'
}]});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
