import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {MATCHES} from './mockMatches.js'
import Match from './match'
import moment from 'moment'

class App extends Component {
  render() {
    return (
      <div className="App">
        <table
          style = {{
            verticalAlign: 'middle',
            borderCollapse: 'separate',
            width: '100%',
            borderSpacing: '0px 5px',
            background: '#d8e2f7'
          }}
        >
        {MATCHES.map((match, index)=>{
          const { summary } = match;
          let result = match._result;
          if (result == "1 match") {
            // result = this.getResultTextFromSummary(summary);
          }
          return(
            <Match
              key={index}
              result={result}
              time={moment(match.timestamp).fromNow()}
              mode={match.mode}
              score={summary.score}
              platform={match.platform}
              kills={summary.kills}
              alive={summary.minutesPlayed}
            />
          )
        })}
        </table>
      </div>
    );
  }
}

export default App;
