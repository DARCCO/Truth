import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPoll } from '../actions/index';

class CreatePoll extends Component {
  render() {
    const { fields: { picture, question, answer1, answer2, answer3, answer4 }, handleSubmit } = this.props;
    //same as writing:
    //const title = this.props.fields.title;
    //const categories = this.props.fields.categories;
    //const content = this.props.fields.content;
    //const handleSubmit = this.props.handleSubmit;
    return (
      <form onSubmit={handleSubmit(this.props.createPoll)}>
        <h3 className="text-center">Create A New Poll</h3>

        <div className="form-group">
          <label>Picture</label>
          <input type="text" className="form-control" {...picture} />
        </div>

        <div className="form-group">
          <label>Question</label>
          <input type="text" className="form-control" {...question} />
          <div className="text-help error-color">
            {question.error}
          </div>
        </div>

        <div className="form-group">
          <label>Answer 1</label>
          <input type="text" className="form-control" {...answer1} />
          <div className="text-help error-color">
            {answer1.error}
          </div>
        </div>

        <div className="form-group">
          <label>Answer 2</label>
          <input type="text" className="form-control" {...answer2} />
          <div className="text-help error-color">
            {answer2.error}
          </div>
        </div>

        <div className="form-group">
          <label>Answer 3</label>
          <input type="text" className="form-control" {...answer3} />
        </div>

        <div className="form-group">
          <label>Answer 4</label>
          <input type="text" className="form-control" {...answer4} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.question) {
    errors.question = 'Required: Enter a question';
  }

  if (!values.answer1) {
    errors.answer1 = 'Required: Enter a possible answer';
  }

  if (!values.answer2) {
    errors.answer2 = 'Required: Enter a possible answer';
  }

  return errors;
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3r is mapDispatchToProps

export default reduxForm({
  form: 'PollNewForm',
  fields: ['picture', 'question', 'answer1', 'answer2', 'answer3', 'answer4'],
  validate
}, null, { createPoll })(CreatePoll);