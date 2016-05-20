var express = require('express');
var mongoose = require('mongoose');
var app = express();

module.exports = app;

// update this later
mongoose.connect('mongodb://localhost/myappdatabase')

app.configure(function(){
  app.use(express.bodyParser());
});





app.listen(3000);
console.log('listening on local 3000')
