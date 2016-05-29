const User = require('../models/user');
const Poll = require('../models/poll');


exports.createPoll = function(req, res, next) {
  var answers = {};
  if (req.body.answer1) {
    answers[req.body.answer1] = 0;
  }
  if (req.body.answer2) {
    answers[req.body.answer2] = 0;
  }
  if (req.body.answer3) {
    answers[req.body.answer3] = 0;
  }
  if (req.body.answer4) {
    answers[req.body.answer4] = 0;
  }
  // both fields must be filled out
  if (!req.body.question || !req.body.answer1 || !req.body.answer2) {
  	res.status(422).send({ error: "You must provide a question and answers" });
  }

  // TO DO: check if createdBy username's lastCreatedPollAt is within 5 minutes of createdAt
  // if so, send an error saying need to wait 5 minutes
  // if not, update user's lastCreatedPollAt with createdAt

  const poll = new Poll ({
    photo: req.body.dataURL,
    createdBy: req.body.username,
    createdAt: req.body.createdAt,
    question: req.body.question,
    answers
  });

  console.log('poll is: ', poll);

  poll.save(function(err){
    //finished saving created poll to database
    //need to update usernames createdPoll list with new poll id
    //need to send back that poll so client can update their state with the poll they just created
    //need to put poll in everyones pending
    //later on put it only pending of people chosen by options sendTo

    if (err) { return next(err); }
    console.log('this is req.body.username:', req.body.username);
    User.find({}, function(err, users) {

      // username: req.body.username.toLowerCase()
      console.log('this is all users', users);
      users.forEach(function(user) {
        if (user.username === req.body.username.toLowerCase()) {
          //put new poll id in created
          user.created[poll.id] = poll.id;
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
            console.log('user after updating created:', user);
          });
        } else {
          //put poll id in pending
          user.pending[poll.id] = poll.id;
          User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
            if (err) { return next(err); }
            console.log('user after updating pending:', user);
          });
        }
      });
    });
    //Poll.findOne()
    res.json({ poll });
  });
};