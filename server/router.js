const Authentication = require('./controllers/authentication');
const CreatePoll = require('./controllers/createpoll')
const passport = require('passport');
const passportService = require('./services/passport')(passport);
const session = require('express-session');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app, io) {
	
  app.use(session({secret: 'asldkhfnpqwe'}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', function(req, res) {
  	res.sendFile(path.resolve(__dirname + '/../index.html'));
  });

  app.get('/bundle.js', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../bundle.js'));
  });

  app.get('/style/style.css', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../style/style.css'));
  });

  app.get('/node_modules/socket.io/node_modules/socket.io-client/socket.io.js', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../node_modules/socket.io/node_modules/socket.io-client/socket.io.js'))
  });

  app.post('/login', function(req, res) {

  } );

  // app.post('/createPoll', function(req, res) {
  //   console.log('inside server /createPoll');
  //   console.log('req.body', req.body);
  //   io.sockets.emit('createpoll', { it: 'worked' });
  //   res.send({});
  // })

  app.post('/signup', Authentication.signup);
  
  app.post('/createpoll', CreatePoll.createPoll);

  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });

}

