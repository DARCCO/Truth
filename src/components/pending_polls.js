import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePoll } from '../actions/index';
import _ from 'lodash';

class PendingPolls extends Component {
  constructor(props) {
    super(props);
    this.renderAnswers = this.renderAnswers.bind(this);
  }
  //need to limit polls to like 20
  renderAnswers(answer, key) {
    return (
      <div className="col-md-5">
        <button className="btn btn-primary">{key}</button>
      </div>
    );
  }

  renderPendingPolls(pollsData, key) {
    var photo = pollsData.photo;
    var question = pollsData.question;
    var answers = pollsData.answers;
    console.log('photo', photo);
    console.log('question:', question);
    console.log('answers:', answers);
    console.log('key', key);
    return (
        <div key={key}>
          <div className="col-md-12">
            <h3 className="text-center">{question}</h3>
          </div>
          <div className="col-md-2">
            <img src='https://developer.bluetooth.org/community/lists/community%20discussion/%22/_layouts/15/images/person.gif?rev=23%22'/>
          </div>
          <div className="col-md-10 center">
            { _.map(answers, (answer, key) => {
              return (
                <div className="col-md-5">
                  <button className="btn btn-primary">{key}</button>
                </div>
              );
            })}
          </div>
        </div>
    );
  }

  //{this.props.pendingPolls.map(this.renderPendingPolls)}
  render() {
    console.log('inside render:', this.props.pendingPolls);
    return (
      <div>
      {_.map(this.props.pendingPolls, this.renderPendingPolls)}
      </div>
    );
  }
}



function mapStateToProps({ pendingPolls }) {
  return { pendingPolls };
}

//
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingPolls);