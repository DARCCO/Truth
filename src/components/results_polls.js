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
    this.renderPieChart = this.renderPieChart.bind(this);
  }

  renderPieChart(pollsData, property) {
    var photo = pollsData.photo;
    var question = pollsData.question;
    var pollId = property;
    var data = [];
    var totalVotes = 0;
    for (var key in pollsData.answers) {
      data.push({ 'answer': key, value: pollsData.answers[key], percentage: null });
      totalVotes += pollsData.answers[key];
    }
    data.forEach(function(answerObject) {
      !answerObject.value ?
      answerObject.percentage = 0
      :
      answerObject.percentage = ((answerObject.value / totalVotes) * 100);
    });

    function renderChartSegment(start, deg, color) {
      console.log('color:', color);
      if (deg <= 180) {
        return (
          <div style={{"transform": `rotate(${start}deg)`}} className="slice">
            <div style={{"transform": `rotate(${deg}deg)`,  "backgroundColor": `${color}`}} className="answer"></div>
          </div>
        );
      }

      var degOne = 180;
      var degTwo = deg - 180;

      return (
        <div>
          <div style={{"transform": `rotate(${start}deg)`}} className="slice">
            <div style={{"transform": `rotate(${degOne}deg)`,  "backgroundColor": `${color}`}} className="answer"></div>
          </div>
          <div style={{"transform": `rotate(${start + degOne}deg)`}} className="slice">
            <div style={{"transform": `rotate(${degTwo}deg)`,  "backgroundColor": `${color}`}} className="answer"></div>
          </div>
        </div>
      );
    }

    var percentA = data[0].percentage,
        percentB = data[1].percentage,
        percentC = data[2] ? data[2].percentage : 0,
        percentD = data[3] ? data[3].percentage : 0;

    var degreeA = data[0].percentage * 3.6,
        degreeB = data[1].percentage * 3.6,
        degreeC = data[2] ? data[2].percentage * 3.6 : 0,
        degreeD = data[3] ? data[3].percentage * 3.6 : 0;

    var colorRed = '#E64C65',
        colorGreen = '#11A8AB',
        colorBlue = '#4FC4F6',
        colorOrange = '#FCB150';

    return (
        <div key={pollId} className="col-md-12">
          <div className="donut-chart-block block">
            <p className="titlechart">Question: {question}</p>
            <div className="col-md-12">
              <div className="col-md-4">
                <img src={photo} />
              </div>
              <div className="col-md-4">
                <div className="donut-chart">
                  {renderChartSegment(0, degreeA, colorRed)}
                  {renderChartSegment(degreeA, degreeB, colorGreen)}
                  {data[2] && data[2].percentage ? renderChartSegment(degreeA + degreeB, degreeC, colorOrange) : null}
                  {data[3] && data[3].percentage ? renderChartSegment(degreeA + degreeB + degreeC, degreeD, colorBlue) : null}
                  <p className="center-title">Poll<br/>Results</p>
                </div>
              </div>
              <div className="col-md-4 center-button">
                <RaisedButton className="center" label='Delete Poll' onClick={ () => this.props.deleteResultsPoll(pollId) } />
              </div>
            </div>
            <div className="col-md-12">
              <ul className="choice-percentages horizontal-list">
                <li>
                  <p className="choicea os colorRed">{data[0].answer}</p>
                  <p className="choice-percentage">{Math.floor(percentA) + "%"}</p>
                </li>
                <li>
                  <p className="choiceb os colorGreen">{data[1].answer}</p>
                  <p className="choice-percentage">{Math.floor(percentB) + "%"}</p>
                </li>
                <li>
                  <p className="choicec os colorOrange">{data[2] ? data[2].answer : 'N/A'}</p>
                  <p className="choice-percentage">{Math.floor(percentC) + "%"}</p>
                </li>
                <li>
                  <p className="choiced os colorBlue">{data[3] ? data[3].answer : 'N/A'}</p>
                  <p className="choice-percentage">{Math.floor(percentD) + "%"}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )

  }

  // renderResultsPolls(pollsData, property) {
  //   console.log('property', property);
  //   var photo = pollsData.photo;
  //   var question = pollsData.question;
  //   var pollId = property;
  //   var data = [];
  //   for (var keys in pollsData.answers) {
  //     data.push({'answer': keys, value: pollsData.answers[keys]});
  //   }
  //   var value = (d) => d.value;
  //   var name = (d) => d.answer;
  //   var width = 700;
  //   var height = 400;
  //   var chartSeries = [];
  //   var colors= ['#64FFDA', '#C6FF00', '#448AFF', '#B388FF'];

  //   const dataCheck = data.filter((curr) => curr.value === 0 );
  //   data.forEach((d, index) => chartSeries.push({field: d.answer, name: d.answer, color: colors[index]}));
  //   const style = {
  //     height: '100%'
  //   };
  //   console.log('this.props inside resultspolls', this.props);
  //   return (
  //     <Paper key={pollId} zDepth={2} style={style}>
  //       <div>
  //         <RaisedButton label='Delete Poll' onClick={ () => this.props.deleteResultsPoll(pollId) } primary={true}/>
  //         <h3 className="text-center">{question}</h3>
  //       </div>
  //       <div className="row table-row">
  //         <div className="col-sm-4 col-md-4 col-lg-4 text-right" >
  //           <span>
  //             <img src={photo} />
  //           </span>
  //         </div>
  //         <div className = 'col-sm-1 col-md-1 col-lg-1'>
  //         </div>
  //         <div className="col-sm-6 col-md-6 col-lg-6 text-center" >
  //           {dataCheck.length === data.length ?
  //               <div className="jumbotron">
  //                 <h1>Waiting on Responses</h1>
  //                 <p>You will know the truth soon enough.</p>
  //               </div>
  //             :
  //               <PieChart
  //               data={data}
  //               width={width}
  //               height={height}
  //               value={value}
  //               name={name}
  //               chartSeries={chartSeries}
  //               />
  //           }
  //         </div>
  //         <div className = 'col-sm-1 col-md-1 col-lg-1'>
  //         </div>
  //       </div>
  //     </Paper>
  //   );
  // }

  render() {
    return (
      <div>
        <Header value= {3}/>
        <Paper zDepth={2} style={{height: 'auto'}}>
          { _.isEmpty(this.props.resultsPolls) ?
              <div className="jumbotron text-center white-text">
                <h1>Oops!</h1>
                <p>There are currently no results polls. Please create a poll!</p>
              </div>
            :
            <div className="container-fluid">
              <div className="row">
                {_.map(this.props.resultsPolls, this.renderPieChart)}
              </div>
            </div>
          }
        </Paper>
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