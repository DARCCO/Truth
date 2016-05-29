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

    const style = {
      height: 200
    };

    const styleButton= {
      margin: '2px'
    }

    return (
      <Paper key={pollId} zDepth= {2} style= {style}>
        <div >
          <div className="col-md-12">
            <div className="col-md-2" >
              <img src= 'http://articlebio.com/uploads/bio/2016/01/31/stone-cold-steve-austin.jpg' className= 'image' height= '150' width='150' />
            </div>
            <h3 className="text-center">{question}</h3>
            <div >
              <div className="col-md-10 center" >
                { _.map(answers, (answer, key) => {
                  return (
                    <div key={key} className="col-md-5" >
                      <RaisedButton style= {styleButton} label= {key} primary= {true} onClick={ ()=> this.props.deletePendingPoll(pollId) }/>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }

  render() {
    return (
      <div>
      <Header value= {2}/>
      {_.map(this.props.pendingPolls, this.renderPendingPolls)}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return { pendingPolls: state.user.pending };
}

//
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePendingPoll, fetchPolls }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingPolls);