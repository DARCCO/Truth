const jwt = require('jwt-simple');
const User = require('../models/user');
const Poll = require('../models/poll');
const config = require('../config');
const mongoose = require('mongoose');

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
    // with all current pending ids
    const user = new User ({
        username: username,
        password: password,
        // photo: photo,
        pending: {},
        created: {}
    });

    console.log('this is user:', user);

    // respond to request indicating user was created
    user.save(function(err){
      if (err) { return next(err); }

      Poll.find({}, function(err, polls) {
        const arrayOfObjectIDs = [];
        const objectOfPendingIDs = polls.reduce(function(accu, curr) {
          accu[curr.id] = curr.id;
          arrayOfObjectIDs.push( mongoose.Types.ObjectId(curr.id) );
          return accu;
        }, {});

        User.findOneAndUpdate({ username: username }, { pending: objectOfPendingIDs }, { new: true }, function(err, user) {
          if (err) { return next(err); }
          console.log('user inside findoneandupdate callback', user);
        });
        console.log('arrayOfObjectIDs', arrayOfObjectIDs);
        Poll.find({
          "_id" : { $in: arrayOfObjectIDs }
        }, function(err, docs) {
          console.log('this should be all the polls', docs);
          const pending = docs.reduce(function(accu, curr) {
            accu[curr.id] = curr;
            return accu;
          }, {});
          console.log('pending', pending);
          res.json({
            user: {
              username: username,
              pending: pending,
              created: {}
            },
            token: tokenForUser(user)
          });
        });
        // res.send(polls.reduce(function(pollMap, item) {
        //   pollMap[item.id] = item;
        //   return pollMap;
        // }, {}));
      });

      // res.json({
      //   //user: user,
      //   token: tokenForUser(user)
      // });
    });
  });
}