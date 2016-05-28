const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const pollSchema = new Schema({

  photo: { data: Buffer, contentType: String },
  question: String,
  answers: {}

});

const PollClass = mongoose.model('poll', pollSchema);

module.exports = PollClass;

