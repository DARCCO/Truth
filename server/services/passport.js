module.exports = function(passport){
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {

});


// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

passport.serializeUser(function(user, done){
  done(null, user.id)
});

passport.deserializeUser(function(user, done){
  done(null, user.id)
});

// Create JWT strategy                      // payload is the decoded token
//                                          // will have username and time stamp
passport.use( new JwtStrategy(jwtOptions, function(payload, done) {
  User.findOne({ id: payload.sub }, function(err, user) {
    // console.log('- - - - - - - - -payload: ', payload)
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
}

