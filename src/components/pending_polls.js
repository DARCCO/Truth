import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePendingPoll, fetchPolls } from '../actions/index';
import _ from 'lodash';
import Header from './header.js';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class PendingPolls extends Component {
  constructor(props) {
    super(props);

    this.renderPendingPolls = this.renderPendingPolls.bind(this);
  }
  //need to limit polls to like 20
  // componentWillMount(){
  //   this.props.fetchPolls();
  // }

  renderPendingPolls(pollsData, key) {
    var photo = pollsData.photo;
    var question = pollsData.question;
    var answers = pollsData.answers;
    var pollId= key;

    var answerArray = Object.keys(answers);

    const styleButton= {
      margin: '2px',
    }

    const style = {
      height: '100%',
      width: '100%',
      margin: 20,
      textAlign: 'center',
    };

    var colorRed = '#E64C65',
        colorGreen = '#11A8AB',
        colorBlue = '#4FC4F6',
        colorOrange = '#FCB150';

    return (
        <div key={pollId} className="col-lg-12">
          <div className="donut-chart-block block">
            <p className="titlechart">Question: {question}</p>
            <div className="col-lg-12">
              <div className="col-lg-4">
              </div>
              <div className="col-lg-4">
              { photo ?
                <img src={photo} className='image' />
               :
                <h2 className="titlechart">No Picture</h2>
              }
              </div>
              <div className="col-lg-4">
              </div>
            </div>
            <br />
            <div className="col-lg-12">
              <ul className="choice-percentages horizontal-list">
                <li>
                  <p className="choicea os colorRed">{answerArray[0]}</p>
                  <p><RaisedButton labelColor='white' backgroundColor={colorRed} style={styleButton} className="center" label='Submit' onClick={ ()=> this.props.deletePendingPoll({ id: pollId, username: this.props.username, answer: answerArray[0] })} /></p>
                </li>
                <li>
                  <p className="choiceb os colorGreen">{answerArray[1]}</p>
                  <p><RaisedButton labelColor='white' backgroundColor={colorGreen} style={styleButton} className="center" label='Submit' onClick={ ()=> this.props.deletePendingPoll({ id: pollId, username: this.props.username, answer: answerArray[1] })} /></p>
                </li>
                <li>
                  <p className="choicec os colorOrange">{answerArray[2] === undefined ? 'N/A' : answerArray[2]}</p>
                  <p><RaisedButton labelColor='white' backgroundColor={colorOrange} disabled={answerArray[2] === undefined} style={styleButton} className="center" label='Submit' onClick={ ()=> this.props.deletePendingPoll({ id: pollId, username: this.props.username, answer: (answerArray[2] === undefined ? null : answerArray[2]) })} /></p>
                </li>
                <li>
                  <p className="choiced os colorBlue">{answerArray[3] === undefined ? 'N/A' : answerArray[3]}</p>
                  <p><RaisedButton labelColor='white' backgroundColor={colorBlue} disabled={answerArray[3] === undefined} style={styleButton} className="center" label='Submit' onClick={ ()=> this.props.deletePendingPoll({ id: pollId, username: this.props.username, answer: (answerArray[3] === undefined ? null : answerArray[3]) })} /></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )

  }

  // renderPendingPolls(pollsData, key) {
  //   var photo = pollsData.photo;
  //   var question = pollsData.question;
  //   var answers = pollsData.answers;
  //   var pollId= key;

  //   const style = {
  //     height: 200
  //   };

  //   const styleButton= {
  //     margin: '2px'
  //   }

  //    return (
  //        <div key={pollId}>
  //          <div className="col-md-12">
  //            <div className="col-md-2" >
  //              <div className='frame'>
  //                <span className='helper'></span>
  //                <img src= {photo} className= 'image' />
  //              </div>
  //            </div>
  //            <div >
  //              <div className="col-md-10 center" >
  //                <h3 className="col-md-10 question">{question}</h3>
  //                <div className= 'centered-Create'>
  //                { _.map(answers, (answer, key) => {
  //                  return (
  //                    <div key={key} className="col-md-5" >
  //                     <RaisedButton style= {styleButton} label= {key} primary= {true} onClick={ ()=> this.props.deletePendingPoll({ id: pollId, username: this.props.username, answer: key }) }/>
  //                    </div>
  //                  );
  //                })}
  //                </div>
  //              </div>
  //            </div>
  //          </div>
  //        </div>
  //    );
  //  }

  render() {
    return (
      <div>
        <Header value= {2}/>
        <Paper zDepth= {2} style={{height: "100vh"}}>
          { _.isEmpty(this.props.pendingPolls) ?
            <div className="jumbotron text-center white-text">
              <h1>Oops!</h1>
              <p>There are currently no pending polls. Check back later!</p>
            </div>
          :
            _.map(this.props.pendingPolls, this.renderPendingPolls)
          }
        </Paper>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return { pendingPolls: state.user.pending, username: state.user.username };
}

//
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePendingPoll, fetchPolls }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingPolls);