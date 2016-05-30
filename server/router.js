const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const CreatePoll = require('./controllers/createpoll');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

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

  app.get('/node_modules/socket.io-client/socket.io.js', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../node_modules/socket.io-client/socket.io.js'))
  });

  app.post('/signin', requireSignin, Authentication.signin);

  app.post('/pendingpolls', CreatePoll.answerPending, function(req, res, next) {
    console.log('req.body inside /pendingpolls', req.body);
    io.sockets.emit('pendingpoll', { poll: req.body.poll }); // needs poll sent through
    res.json({ id: req.body.id });
  });

  app.post('/resultspolls', CreatePoll.removeResults, function(req, res, next) {
    console.log('req.body inside /resultspolls', req.body);
    io.sockets.emit('resultspoll', { id: req.body.pollId }); // needs poll sent through
    res.json({ id: req.body.pollId });
  });

  app.post('/signup', Authentication.signup);

  app.post('/createpoll', CreatePoll.createPoll, function(req, res, next) {
    io.sockets.emit('createpoll', { poll: req.body.poll });
    res.json({ poll: req.body.poll })
  });

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });

}
