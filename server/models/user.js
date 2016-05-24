const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

// define our model
const userSchema = new Schema({
  // email prop has obj to determine it is unique email
  // and to make tolowercase
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save Hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this; // user.email, user.password
  
  // generate a salt, then run callback
  bcrypt.genSalt(10, function (err, salt) {
       if (err) { return next(err); }
    
    // hash (encrypt) our password using this salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
    	if (err) { return next(err); }
        
        // overwrite plain text password with encrypted password
    	user.password = hash;
    	next();
    });
  });
});

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
