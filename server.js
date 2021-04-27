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

app.get('/ping', (request, response) => {
  response.send('pong');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
