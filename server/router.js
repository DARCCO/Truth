const Authentication = require('./controllers/authentication');
const passportService = ('./services/passport');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app, io) {
	
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

  app.post('/createPoll', function(req, res) {
    console.log('inside server /createPoll');
    console.log('req.body', req.body);
    io.sockets.emit('createpoll', { it: 'worked' });
    res.send({});
  })

  app.post('/signup', Authentication.signup);

  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
}

