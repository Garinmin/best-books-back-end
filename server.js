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



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('mongoose is connected');
});

const UserModel = require('./models/User');

async function getAllUsers(request, response) {
  try {
    await UserModel.find({}, (err, users) => {
      console.log({users});
      response.send(users);
    });
  }
  catch (error) {
    response.status(500).send({message: error});
  }
}

app.get('/books', getAllUsers);

app.post('/books', async (request, response) => {
  const books = request.body;
  const email = request.query.email;

  try {await UserModel.find({email}, (err, users) =>{
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
  }
  catch (error) {
    response.status(400).send({message: error});
  }
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

// app.put('/books/:index', async (request, response) => {
//   const email = request.query.email;
//   const book = request.params;
// })

app.get('/ping', (request, response) => {
  response.send('pong');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
