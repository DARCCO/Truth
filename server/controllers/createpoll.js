const User = require('../models/user');
const Poll = require('../models/poll');

exports.answerPending = function(req, res, next) {
  console.log('req.body inside answerPending', req.body);
  // we need to go to user who answered in collection
  User.findOne({ username: req.body.username}, function(err, user) {
    if (err) { return next(err); }
    // remove poll from their pending
    delete user.pending[req.body.id];
    User.findOneAndUpdate( { username: user.username }, { pending: user.pending }, { next: true }, function(err, user) {
      if (err) { return next(err); }
    });
  });
  // find poll by id
  Poll.findOne({ "_id": req.body.id }, function(err, poll) {
    console.log('this is the poll that was answered:', poll);
  // update answer count
    poll.answers[req.body.answer]++;
    Poll.findOneAndUpdate({ "_id": poll.id }, { answers: poll.answers }, { next: true }, function(err, poll) {
      if (err) { return next(err); }
      console.log('poll after update:', poll);
    })
  });
  res.send({ id: req.body.id }); //update user's state who answered in reducer
}

exports.removeResults = function(req, res, next) {
  Poll.findOne({ "_id": req.body.pollId }, function(err, poll) {
    if (err) { return next(err); }
    User.find({}, function(err, users) {
      if (err) { return next(err); }
      users.forEach(function(user) {
        // user: { pending:
        //    { '574b5f771a93b231228affeb': '574b5f771a93b231228affeb',
        //      '574a337892f72c490c2214fb': '574a337892f72c490c2214fb',
        //      '574a31b57560f3140ceb0ea0': '574a31b57560f3140ceb0ea0',
        //      '574a31aa7560f3140ceb0e9f': '574a31aa7560f3140ceb0e9f',
        //      '574a319f7560f3140ceb0e9e': '574a319f7560f3140ceb0e9e',
        //      '574a31897560f3140ceb0e9d': '574a31897560f3140ceb0e9d',
        //      '574a317a7560f3140ceb0e9c': '574a317a7560f3140ceb0e9c',
        //      '574b3fbcd8b5c3c91fcaa163': '574b3fbcd8b5c3c91fcaa163' },
        //   __v: 0,
        //   lastCreatedPollAt: null,
        //   password: '$2a$10$F4L5anREl/T.U/mUHFeQH.2lRwM4Aw8yfwrimT8F8yvx/wQ84DX5.',
        //   username: 'drew',
        //   _id: 574a465178a9254f1088b034 }
        if (user.username === poll.createdBy) {
          console.log('user before update');
          delete user.created[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
            console.log('user after update:', user);
          });
        } else {
          delete user.pending[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
            if (err) { return next(err); }
            console.log('user after update:', user);
          })
        }
      });
    });
    Poll.remove({ id: poll.id }, function (err) {
      if (err) return handleError(err);
    });
    res.send({ id: poll.id });
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
    res.json({ poll });
  });
};