
const Poll = require('../models/poll');


exports.createPoll = function(req, res, next) {
  console.log('called - - - - - - - - - ')
  const photo = req.body.photo;
  const question = req.body.question;
  const answers = req.body.answers;

  // both fields must be filled out
  if (!question || !answers) {
  	res.status(422).send({ error: "You must provide a photo, question, and answers" });
  }

  console.log('- - - - - - - - - - - - - - - -')

  // if poll already exists, can't make it
  Poll.findOne( {question: question}, function(err, existingPoll) {
    if (err) {
      return next(err);
    }

    if (existingPoll) {
      return res.status(422).send({ error: 'this poll has already been created' });
    }

    // if we get the right number of answers
    if (Object.keys(answers).length >= 2) {
      // create number of answers provided	
      var tempAnswers = {};

        for (var i = 0; i < Object.keys(answers).length; i++) {
          tempAnswers[Object.keys(answers)[i]] = {
          	a: answers[Object.keys(answers)[i]],
          	count: 0
          }
        }

    } 

    if (Object.keys(answers).length < 2) {  
      return res.status(422).send({ error: 'please enter at least two answers' });
    }
  
    const poll = new Poll ({
      photo: photo,
      question: question,
      answers: tempAnswers
    })

    poll.save(function(err){
      if (err) { return next(err); }
    });

    // socket emitting
    io.sockets.emit('createpoll', { it: 'worked' });
    res.json({ status: 'poll entered into database!' });


  })
};