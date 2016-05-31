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

  // user is logged in, need to send them their user object with all correct information:
  // receive username through req.body.username
  // use username to get all other information in user collection
  // use user.pending and user.collection id's to get the polls needed from the polls collection
  // send them a user object with all their user info and created/pending polls inside properties
  const username = req.body.username;

  User.findOne({ username: username.toLowerCase() }, function(err, existingUser) {
    if (err) { return next(err); }
    const photo = existingUser.photo || null, //photo is optional, so either set to photo or null
      city = existingUser.city || null, // remove null when city is required to sign up
      country = existingUser.country || null, //remove null when country is required to sign up
      gender = existingUser.gender || null, //remove null when gender is required to sign up
      friends = existingUser.friends,
      pending = existingUser.pending,
      created = existingUser.created,
      lastCreatedPollAt = existingUser.lastCreatedPollAt || null;
      //get all polls
      Poll.find({}, function(err, polls) {
          // create a pending object with all polls that have a matching ID in pending
        const pendingObject = {};
          // create a created object with all polls that have a matching ID in created
        const createdObject = {};
        polls.forEach(function(poll) {
          // if poll id exists in pending/created, then add it to object
          if (pending[poll.id]) pendingObject[poll.id] = poll;
          if (created[poll.id]) createdObject[poll.id] = poll;
        });
        res.json({
          user: {
            username,
            photo,
            city,
            country,
            gender,
            friends,
            pending: pendingObject,
            created: createdObject,
            lastCreatedPollAt
          },
          token: tokenForUser(req.user) });
      });
  });

  // user: {
  //   username,
  //   photo:,
  //   city:,
  //   country:,
  //   gender:,
  //   friends:,
  //   pending:,
  //   created:,
  //   lastCreatedPollAt:
  // }
}

exports.signup = function(req, res, next) {
  const username = req.body.username,
    password = req.body.password,
    photo = req.body.photo,
    city = req.body.city,
    country = req.body.country,
    gender = req.body.gender;

  if ( !username || !password ) {
  	return res.status(422).send({ error: 'You must provide username and password' })
  }

  // see if a user with a given username exists

  User.findOne({ username: username.toLowerCase() }, function(err, existingUser) {
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
        username,
        password,
        photo,
        city,
        country,
        gender,
        friends: {},
        pending: {},
        created: {},
        lastCreatedPollAt: null
    });

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
        User.findOneAndUpdate({ username: username.toLowerCase() }, { pending: objectOfPendingIDs, created: {}, friends: {} }, { new: true }, function(err, user) {
          if (err) { return next(err); }
        });
        Poll.find({
          "_id" : { $in: arrayOfObjectIDs }
        }, function(err, docs) {
          const pending = docs.reduce(function(accu, curr) {
            accu[curr.id] = curr;
            return accu;
          }, {});
          res.json({
            user: {
              username,
              photo,
              city,
              country,
              gender,
              friends: {},
              pending,
              created: {},
              lastCreatedPollAt: null
            },
            token: tokenForUser(user)
          });
        });
      });
    });
  });
}