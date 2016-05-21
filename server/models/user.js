const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
  // email prop has obj to determine it is unique email
  // and to make tolowercase
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// create the model class
const modelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
