const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

// Create JWT strategy                      // payload is the decoded token
//                                          // will have username and time stamp
passport.use( new JwtStrategy(jwtOptions, function(payload, done) {
  User.findOne({ id: payload.sub }, function(err, user) {
  	if (err) { 
      return done(err, false); 
    }
  	if (user) {
  	  done(null, user);
  	} else {
  	  done(null, false);
  	}
  });
}));

