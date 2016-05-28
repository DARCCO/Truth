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

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  console.log('inside signup in .controllers/authentication pw,user is:', username, password);
  // const photo = req.body.photo;
  //console.log(photo)

  if ( !username || !password ) {
  	return res.status(422).send({ error: 'You must provide username and password' })
  }

  // see if a user with a given username exists

  User.findOne({ username: username }, function(err, existingUser) {
    if (err) { return next(err); }
  	// if a username does exist
  	if (existingUser) {
  	  // return with error
  	  return res.status(422).send({ error: 'Username is in use' });
  	}

  	// if username does NOT exist

  	  // create and save our record

  	const user = new User ({
  	  username: username,
  	  password: password
      // photo: photo,
      //pending: [],
      //created: []
  	});

    // respond to request indicating user was created
    user.save(function(err){
      if (err) { return next(err); }

      res.json({ token: tokenForUser(user) });
    });
  });
}