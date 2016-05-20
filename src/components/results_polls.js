import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePoll } from '../actions/index';

class ResultsPolls extends Component {
  //need to limit polls to like 20
  renderResultsPolls(pollsData) {
    return (
      <div>
      <div>
        <div className="col-md-12">
          <h3 className="text-center">Does Joey smell bad?</h3>
        </div>
        <div className="col-md-2">
          <img src='https://developer.bluetooth.org/community/lists/community%20discussion/%22/_layouts/15/images/person.gif?rev=23%22'/>
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">He smells awful</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">It's the worst</button>
          </div>
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">It's ok</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">He's fine</button>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-12">
          <h3 className="text-center">Does Joey smell bad?</h3>
        </div>
        <div className="col-md-2">
          <img src='https://developer.bluetooth.org/community/lists/community%20discussion/%22/_layouts/15/images/person.gif?rev=23%22'/>
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">He smells awful</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">It's the worst</button>
          </div>
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">It's ok</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">He's fine</button>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-12">
          <h3 className="text-center">Does Joey smell bad?</h3>
        </div>
        <div className="col-md-2">
          <img src='https://developer.bluetooth.org/community/lists/community%20discussion/%22/_layouts/15/images/person.gif?rev=23%22'/>
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">He smells awful</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">It's the worst</button>
          </div>
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-10 center">
          <div className="col-md-5">
          <button className="btn btn-primary">It's ok</button>
          </div>
          <div className="col-md-5">
          <button className="btn btn-primary">He's fine</button>
          </div>
        </div>
      </div>
      </div>
    );
  }

  //{this.props.pendingPolls.map(this.renderPendingPolls)}
  render() {
    return (
      <div>

      {this.renderResultsPolls()}
      </div>
    );
  }
}



function mapStateToProps({ resultsPolls }) {
  return { resultsPolls };
}

//
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPolls);