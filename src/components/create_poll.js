import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { reduxForm } from 'redux-form';
import { createPoll } from '../actions/index';
import Header from './header';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = { file: [], dataURL: '' };

    this.onDrop = this.onDrop.bind(this);
    this.removePicture = this.removePicture.bind(this);
  }

  removePicture() {
    this.setState({ file: [], dataURL: '' });
  }

  onDrop(file) {
    //make sure file is an image file in here
    var that = this;
    if (file[0].type.match(/image.*/)) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        var dataURL = evt.target.result;
        var image = new Image();
        image.onload = function (imageEvent) {
          var resizedImage;
          // Resize the image
          var canvas = document.createElement('canvas'),
            max_size = 300,
            width = image.width,
            height = image.height;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          resizedImage = canvas.toDataURL('image/jpeg');
          that.setState({ file: file, dataURL: resizedImage });
        }
        image.src = dataURL;
      };
      reader.readAsDataURL(file[0]);
    } else {
      //change this to a div warning on screen
      console.log('file not supported');
    }
  }

  handleFormSubmit({ question, answer1, answer2, answer3, answer4 }) {
    this.props.createPoll({ question, answer1, answer2, answer3, answer4, username: this.props.username, createdAt: new Date(), dataURL: this.state.dataURL });
    this.removePicture();
    this.props.resetForm();
  }

  render() {
    const { fields: { question, answer1, answer2, answer3, answer4 }, handleSubmit } = this.props;
    const style = {
      height: '100%'
    };

    const styleButton= {
      width: '20%',
      //height: '40px'
    }

    const styleDropzone= {
      width: 200,
      height: 200,
      borderWith: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5,
      margin: 'auto'
    }

    const activeStyleDropzone= {
      width: 200,
      height: 200,
      borderWith: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5,
      margin: 'auto'
    }

    const styleCancel= {
      margin: 'auto'
    }

    return (
      <div>
      <Header value= {4}/>
      <Paper style= {style} zDepth= {4}>
        <div className= 'modal-body'>
          {this.state.file.length > 0 ?
            <div className= 'centered-Create'>
              <img className= 'dropzoneIMG' src={this.state.file[0].preview} />
            </div>
          :
            <div>
              <div>
              <Dropzone style= { styleDropzone } onDrop={this.onDrop} accept="image/*">
                <div className= 'text-center'>Try dropping an image here, or click to select image to upload.</div>
              </Dropzone>
              </div>
            </div>
          }
        </div>
        <div className= 'centered-Create'>
          <FlatButton label= 'Cancel' secondary= {true} onClick={ this.removePicture }/>
        </div>
        <div className= 'centered-Create'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Question' { ...question }/>
          {question.touched && question.error && <div className= 'error'>{question.error}</div>}
          </div>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Answer 1' { ...answer1 }/>
          {answer1.touched && answer1.error && <div className= 'error'>{answer1.error}</div>}
          </div>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Answer 2' { ...answer2 }/>
          {answer2.touched && answer2.error && <div className= 'error'>{answer2.error}</div>}
          </div>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Answer 3' { ...answer3 }/>
          {answer3.touched && answer3.error && <div className= 'error'>{answer3.error}</div>}
          </div>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Answer 4' { ...answer4 }/>
          {answer4.touched && answer4.error && <div className= 'error'>{answer4.error}</div>}
          </div>
          <RaisedButton style= {styleButton} type='submit' label= 'Submit' primary= {true}/>
        </form>
      </div>
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


  if (values.answer1) {
    if (values.answer1.indexOf('.') !== -1) {
     errors.answer1= 'Answers must not contain periods';
    }
  }

  if (values.answer2) {
    if (values.answer2.indexOf('.') !== -1) {
      errors.answer2= 'Answers must not contain periods';
    }
    if (!values.answer1) {
      errors.answer2 = 'Previous answers must be completed';
    }
    if (values.answer1) {
      const answer2= values.answer2.replace(/ /g, '').toLowerCase();
      const answer1= values.answer1.replace(/ /g, '').toLowerCase();
      if (answer2 === answer1) {
        errors.answer2= 'Answers must not match';
      }
    }
  }

  if (values.answer3) {
    if (values.answer3.indexOf('.') !== -1) {
      errors.answer3= 'Answers must not contain periods';
    }
    if (!values.answer1 || !values.answer2) {
      errors.answer3 = 'Previous answers must be completed';
    }
    if (values.answer2 && values.answer1){
      const answer3= values.answer3.replace(/ /g, '').toLowerCase();
      const answer2= values.answer2.replace(/ /g, '').toLowerCase();
      const answer1= values.answer1.replace(/ /g, '').toLowerCase();
      if (answer3 === answer2 || answer3 === answer1) {
        errors.answer3= 'Answers must not match';
      }
    }
  }

  if (values.answer4) {
    if (values.answer4.indexOf('.') !== -1) {
      errors.answer4= 'Answers must not contain periods';
    }
    if (!values.answer3) {
      errors.answer4 = 'Previous answers must be completed';
    }
    if (values.answer3 && values.answer2 && values.answer1) {
      const answer4= values.answer4.replace(/ /g, '').toLowerCase();
      const answer3= values.answer3.replace(/ /g, '').toLowerCase();
      const answer2= values.answer2.replace(/ /g, '').toLowerCase();
      const answer1= values.answer1.replace(/ /g, '').toLowerCase();
      if (answer4 === answer3 || answer4 === answer2 || answer4 === answer1) {
        errors.answer4= 'Answers must not match';
      }
    }
  }

  return errors;
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3r is mapDispatchToProps

function mapStateToProps(state) {

  return { username: state.user.username };
}

export default reduxForm({
  form: 'PollNewForm',
  fields: ['picture', 'question', 'answer1', 'answer2', 'answer3', 'answer4'],
  validate
}, mapStateToProps, { createPoll })(CreatePoll);