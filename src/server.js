const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);


mongoose.connect('mongodb+srv://tractian-user:D7EmTSBSGETaFNjR@tractian.cwuvi.mongodb.net/tractian?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3000);
