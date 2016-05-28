import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteResultsPoll } from '../actions/index';
import { PieChart } from 'react-d3-basic';
import _ from 'lodash';
import Header from './header.js';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
    var colors= ['#64FFDA', '#C6FF00', '#448AFF', '#B388FF'];

    data.forEach((d, index) => chartSeries.push({field: d.answer, name: d.answer, color: colors[index]}));
    const style = {
      height: 500
    };
    console.log('this.props inside resultspolls', this.props);
    return (
      <Paper zDepth= {2} style= {style}>
      <div key={key}>
        <div >
          <h3 className="center">{question}</h3>
          <RaisedButton label= 'Delete Poll' onClick= { () => this.props.deleteResultsPoll(pollId) } primary= {true}/>
        </div>
        <div >
          <img src= {photo}/>
        </div>
        <div className="text-center">
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
        </Paper>
    );
  }

  render() {
    return (
      <div>
        <Header value= {3}/>
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