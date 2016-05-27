const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const pollSchema = new Schema({

  photo: { data: Buffer, contentType: String },
  question: { type: String, lowercase: true },
  answers: {
  	a1: {
      a: { type: String },
      count: { type: Number }
  	},
  	a2: {
      a: { type: String },
      count: { type: Number }
  	},
  	a3: {
      a: { type: String },
      count: { type: Number }
  	},
  	a4: {
      a: { type: String },
      count: { type: Number }
  	}
  }

});

const PollClass = mongoose.model('poll', pollSchema);

module.exports = PollClass;

