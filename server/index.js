// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const server = http.createServer(app);
const io = require('socket.io')(server);




// DB setup --> connects our db to our code

mongoose.connect('mongodb://127.0.0.1:auth/truthdb');

// App setup


// morgan logs so we can debug
// bodyParser puts all requests into json
app.use(morgan('combined'))
app.use(cors());
app.use(bodyParser.json({type: '*/*'}))
router(app, io);


// Server setup

const port = process.env.PORT || 3090;

io.on('connection', function(socket){
  console.log('connected io');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
server.listen(port);
console.log('Server listening on:', port);
