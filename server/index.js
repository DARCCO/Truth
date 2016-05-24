// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');



// DB setup --> connects our db to our code

mongoose.connect('mongodb://127.0.0.1:auth/auth');

// App setup


// morgan logs so we can debug
// bodyParser puts all requests into json
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app);


// Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ' + port);
