const User = require('../models/user');
const Poll = require('../models/poll');

exports.answerPending = function(req, res, next) {
  // we need to go to user who answered in collection
  User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
    if (err) { return next(err); }
    // remove poll from their pending
    delete user.pending[req.body.id];
    User.findOneAndUpdate( { username: user.username }, { pending: user.pending }, { next: true }, function(err, user) {
      if (err) { return next(err); }
    });
  });
  // find poll by id
  Poll.findOne({ "_id": req.body.id }, function(err, poll) {
  // update answer count
    poll.answers[req.body.answer]++;
    Poll.findOneAndUpdate({ "_id": poll.id }, { answers: poll.answers }, { next: true }, function(err, poll) {
      if (err) { return next(err); }
    })
  });
  next();
}

exports.removeResults = function(req, res, next) {
  Poll.findOne({ "_id": req.body.pollId }, function(err, poll) {
    if (err) { return next(err); }
    User.find({}, function(err, users) {
      if (err) { return next(err); }
      users.forEach(function(user) {
        if (user.username === poll.createdBy) {
          delete user.created[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          });
        } else {
          delete user.pending[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          })
        }
      });
    });
    Poll.remove({ id: poll.id }, function (err) {
      if (err) return handleError(err);
    });
    next();
  });
}

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
    User.find({}, function(err, users) {
      users.forEach(function(user) {
        if (user.username === req.body.username.toLowerCase()) {
          user.created[poll.id] = poll.id;
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          });
        } else {
          user.pending[poll.id] = poll.id;
          User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          });
        }
      });
    });
    req.body.poll = poll;
    next();
  });
};