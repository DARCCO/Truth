const Authentication = require('./controllers/authentication');
const passportServices = ('./services/passport');
const passport = require('passport');
const path = require('path')

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app) {
  app.get('/', function(req, res) {
  	res.send({ status: 'hello' })
  })
  app.post('/signup', Authentication.signup)
}
