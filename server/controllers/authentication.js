const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  // sub is a convention, jwt tokens have sub, short for subject
  // subject of token is specific user
  // iat is another convention: issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if ( !username || !password ) {
  	return res.status(422).send({ error: 'You must provide username and password' })
  }

  // see if a user with a given username exists

  User.findOne({ username: username }, function(err, existingUser) {
    if (err) { return next(err); }
  	// if a username does exist
  	if (existingUser) {
  	  // return with error
  	  return res.status(422).send({ error: 'username is in use' });
  	}

  	// if username does NOT exist

  	  // create and save our record

  	const user = new User ({
  	  username: username,
  	  password: password
  	})

  	user.save(function(err){
  		if (err) { return next(err); }
  	});

  	// respond to request indicating user was created

  	res.json({ token: tokenForUser(user) });


  })



}