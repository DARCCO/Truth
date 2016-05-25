const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy                      // payload is the decoded token
//                                          // will have username and time stamp
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user ID in payload exists in database, if it does
  // call 'done' with that user
  // otherwise, call done w/o user object
  User.findById(payload.sub, function(err, user) {
  	if (err) { return done(err, false); }

  	if (user) {
  	  done(null, user);
  	} else {
  	  done(null, false);
  	}
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);