const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({

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

// this saves a poll... not sure if needed
userSchema.pre('save', function(next) {
  const user = this;
}

const PollClass = mongoose.model('poll', userSchema);

module.exports = PollClass;

