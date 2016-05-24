import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePendingPoll } from '../actions/index';
import { fetchPolls } from '../actions/index';
import _ from 'lodash';
import Header from './header.js';

class PendingPolls extends Component {
  constructor(props) {
    super(props);

    this.renderPendingPolls = this.renderPendingPolls.bind(this);
  }
  //need to limit polls to like 20
  componentWillMount(){
    this.props.fetchPolls();
  }

  renderPendingPolls(pollsData, key) {
    var photo = pollsData.photo;
    var question = pollsData.question;
    var answers = pollsData.answers;
    var pollId= key;

    return (
        <div key={pollId}>
          <div className="col-md-12">
            <h3 className="text-center">{question}</h3>
          </div>
          <div className="col-md-2">
            <img src= {photo}/>
          </div>
          <div className="col-md-10 center">
            { _.map(answers, (answer, key) => {
              return (
                <div className="col-md-5" >
                  <button className="btn btn-primary" onClick={ ()=> this.props.deletePendingPoll(pollId) }>{key}</button>
                </div>
              );
            })}
          </div>
        </div>
    );
  }

  render() {
    return (
      <div>
      <Header />
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