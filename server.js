'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('mongoose is connected');
});

const User = require('./models/User');

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
Rinat.save();

function getAllUsers(request, response) {
  const email = request.query.email;
  console.log({email});

  User.find({email}, (err, parents) => {
    if(err) {
      return console.error(err);
    }
    console.log({parents});
    response.send(parents.length ? parents[0].books : 'no books');
  });
};

app.get('/books', getAllUsers);



app.get('/ping', (request, response) => {
  response.send('pong');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
