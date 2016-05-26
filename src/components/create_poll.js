import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { reduxForm } from 'redux-form';
import { createPoll } from '../actions/index';
import Header from './header';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    console.log('this', this);
    this.setState({ files: files });
    this.props.fields.picture.value = files;
    console.log('files:', files);
    console.log('this.props',this.props);
    console.log('state', this.state)
  }

  render() {
    const { fields: { picture, question, answer1, answer2, answer3, answer4 }, handleSubmit } = this.props;
    const style = {
      height: 750
    };

    return (
      <div>
      <Header value= {4}/>
        <Paper style= {style} zDepth= {4}>
          <div className="col-md-12">
        <div className="col-md-6">
      <Dropzone onDrop={this.onDrop} accept="image/*">
                    <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      </div>
      <div className="col-md-6">
      {this.state.files.length > 0 ?
        <div>
          <h2>Preview of picture:</h2>
          <img src={this.state.files[0].preview} height="200" />
        </div>
        : null}
        </div>
        </div>
        <form onSubmit={handleSubmit(this.props.createPoll)}>


          <div className="form-group">
          <TextField fullWidth hintText= 'Question' { ...question }/>
          {question.touched && question.error && <div className= 'error'>{question.error}</div>}
          </div>

          <div className="form-group">
          <TextField fullWidth hintText= 'Answer 1' { ...answer1 }/>
          {answer1.touched && answer1.error && <div className= 'error'>{answer1.error}</div>}
          </div>

          <div className="form-group">
          <TextField fullWidth hintText= 'Answer 2' { ...answer2 }/>
          {answer2.touched && answer2.error && <div className= 'error'>{answer2.error}</div>}
          </div>

          <div className="form-group">
          <TextField fullWidth hintText= 'Answer 3' { ...answer3 }/>
          </div>

          <div className="form-group">
          <TextField fullWidth hintText= 'Answer 4' { ...answer4 }/>
          </div>
          <RaisedButton type='submit' label= 'Submit' primary= {true}/>
        </form>
        </Paper>
      </div>
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

function mapStateToProps({ resultsPolls }) {
  return { resultsPolls };
}

export default reduxForm({
  form: 'PollNewForm',
  fields: ['picture', 'question', 'answer1', 'answer2', 'answer3', 'answer4'],
  validate
}, mapStateToProps, { createPoll })(CreatePoll);