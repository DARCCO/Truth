import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteResultsPoll } from '../actions/index';
import { PieChart } from 'react-d3-basic';
import _ from 'lodash';
import Header from './header.js';

class ResultsPolls extends Component {
  //need to limit polls to like 20
  constructor(props) {
    super(props);
    this.renderResultsPolls = this.renderResultsPolls.bind(this);
  }

  renderResultsPolls(pollsData, key) {
    var photo = pollsData.photo;
    var question = pollsData.question;
    var pollId = key;
    var data = [];
    for (key in pollsData.answers) {
      data.push({'answer': key, value: pollsData.answers[key]});
    }
    var value = (d) => d.value;
    var name = (d) => d.answer;
    var width = 700;
    var height = 400;
    var chartSeries = [];

    data.forEach((d) => chartSeries.push({field: d.answer, name: d.answer}));

    console.log('this.props inside resultspolls', this.props);
    return (
      <div key={key}>
        <div className="col-md-12">
          <h3 className="text-center">{question}</h3>
          <button onClick= { () => this.props.deleteResultsPoll(pollId) }>Delete Poll</button>
        </div>
        <div className="col-md-2">
          <img src= {photo}/>
        </div>
        <div className="col-md-10 center">
          <PieChart
          data= {data}
          width= {width}
          height= {height}
          value= {value}
          name= {name}
          chartSeries= {chartSeries}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {_.map(this.props.resultsPolls, this.renderResultsPolls)}
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return { resultsPolls: state.user.created };
}

//
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteResultsPoll }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPolls);