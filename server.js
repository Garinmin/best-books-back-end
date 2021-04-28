'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('mongoose is connected');
});

const UserModel = require('./models/User');

// const Rinat = new User({email: 'phony@email.com', books: [{
//   name:'The Dispossesed',
//   status: 'Used'
// },{
//   name: 'To the Lighthouse',
//   status: 'New'
// },{
//   name: 'Harry Potter and the Chamber of Secrets',
//   status: 'Beat up'
// }]});
// Rinat.save();

async function getAllUsers(request, response) {
  const email = request.query.email;
  console.log({email});

  await UserModel.find({email}, (err, users) => {
    console.log({users});
    response.send(users[0].books);
  });
}

app.get('/books', getAllUsers);

app.post('/books', async (request, response) => {
  const books = request.body;
  const email = request.query.email;

  await UserModel.find({email}, (err, users) =>{
    if(users.length) {
      const currentUser = users[0];
      const currentBooks = currentUser.books;

      currentBooks.push(books);

      currentUser.save();

      response.send(currentBooks);
    } else {
      response.send('no user found');
    }
  });
});

app.delete('/books/:index', async (request, response) => {
  const email = request.query.email;

  const index = Number(request.params.index);

  console.log({index});
  console.log({email});

  await UserModel.find({email}, (err, users) => {

    if (users.length) {
      const user = users[0];

      const currentBooks = user.books;

      currentBooks.splice(index, 1);

      user.save();
      response.send(currentBooks);
    } else {
      response.send('no user found');
    }
  });
});


app.get('/ping', (request, response) => {
  response.send('pong');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
