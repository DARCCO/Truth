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

  renderResultsPolls(pollsData, property) {
    console.log('property', property);
    var photo = pollsData.photo;
    var question = pollsData.question;
    var pollId = property;
    var data = [];
    for (var keys in pollsData.answers) {
      data.push({'answer': keys, value: pollsData.answers[keys]});
    }
    var value = (d) => d.value;
    var name = (d) => d.answer;
    var width = 700;
    var height = 400;
    var chartSeries = [];
    var colors= ['#64FFDA', '#C6FF00', '#448AFF', '#B388FF'];

    const dataCheck = data.filter((curr) => curr.value === 0 );
    data.forEach((d, index) => chartSeries.push({field: d.answer, name: d.answer, color: colors[index]}));
    const style = {
      height: '100%'
    };
    console.log('this.props inside resultspolls', this.props);
    return (
      <Paper key={pollId} zDepth={2} style={style}>
        <div>
          <RaisedButton label='Delete Poll' onClick={ () => this.props.deleteResultsPoll(pollId) } primary={true}/>
          <h3 className="text-center">{question}</h3>
        </div>
        <div className="row table-row">
          <div className="col-sm-4 col-md-4 col-lg-4 text-right" >
            <span>
              <img src={photo} />
            </span>
          </div>
          <div className = 'col-sm-1 col-md-1 col-lg-1'>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 text-center" >
            {dataCheck.length === data.length ?
                <div className="jumbotron">
                  <h1>Waiting on Responses</h1>
                  <p>You will know the truth soon enough.</p>
                </div>
              :
                <PieChart
                data={data}
                width={width}
                height={height}
                value={value}
                name={name}
                chartSeries={chartSeries}
                />
            }
          </div>
          <div className = 'col-sm-1 col-md-1 col-lg-1'>
          </div>
        </div>
      </Paper>
    );
  }

  render() {
    return (
      <div>
        <Header value= {3}/>
          {_.map(this.props.resultsPolls, this.renderResultsPolls)}
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