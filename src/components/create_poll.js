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
    this.state = { file: [], dataURL: '' };

    this.onDrop = this.onDrop.bind(this);
    this.removePicture = this.removePicture.bind(this);
  }

  removePicture() {
    this.setState({ file: [], dataURL: '' });
  }

  onDrop(file) {
    //make sure file is an image file in here
    console.log('file', file);
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
            max_size = 200,
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
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          resizedImage = canvas.toDataURL('image/jpeg');
          that.setState({ file: file, dataURL: resizedImage });
          console.log('this.stte.dataURL', this.state.dataURL);
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
      height: 700
    };

    const styleButton= {
      width: '20%',
      //height: '40px'
    }


    return (
      <div>
      <Header value= {4}/>
      <Paper style= {style} zDepth= {4}>
        <div>
            {this.state.file.length > 0 ?
              <div>
                <h2>Preview of picture:</h2>
                <img src={this.state.file[0].preview} height="200" />
                <button onClick={this.removePicture}>Remove</button>
              </div>
            :
              <div className="col-md-offset-4 col-md-4" >
                <Dropzone onDrop={this.onDrop} accept="image/*">
                  <div>Try dropping an image here, or click to select image to upload.</div>
                </Dropzone>
              </div>
            }
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
          </div>

          <div className="form-group">
          <TextField style ={{width: '80%'}} hintText= 'Answer 4' { ...answer4 }/>
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