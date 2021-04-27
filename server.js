'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/ping', (request, response) => {
  response.send('pong');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
