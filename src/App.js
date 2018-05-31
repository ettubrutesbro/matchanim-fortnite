import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {MATCHES} from './mockMatches.js'
import Match from './match'
import moment from 'moment'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      addMatches: []
    }
  }
  addMatch = () => {
    const newMatch = this.generateMatch()
    let newAddMatches = this.state.addMatches
    newAddMatches.unshift(newMatch)
    this.setState({
      addMatches: newAddMatches
    })
  }

  generateMatch = () => { 
    return {
      timestamp: moment(Date.now()),
      platform: 'pc',
      mode: 'solo',
      season: 'season-4',
      matchesPlayed: 1,
      '_result': '1 match',
      summary: {
        kills: Math.floor(Math.random()*15),
        score: Math.floor(Math.random()*1500),
        placetop1: 0,
        placetop10: 0,
        placetop25: 0,
        matchesPlayed: 1,
        minutesPlayed: null,
        timePlayed: 0,
        wins: 0,
        losses: 1,
    }  
  }
}

  render() {
    const {addMatches} = this.state
    // console.log(this.state.addMatches)
    const matchList = addMatches.length > 0? addMatches.concat(MATCHES) : MATCHES
    // const matchList = MATCHES.unshift(...addMatches)
    console.log(matchList)
    return (
      <div className="App">
        <div 
          style = {{background: 'black', color: 'white', padding: '15px'}}
          onClick = {this.addMatch}
        >
          add fake match btn
        </div>
        <table
          style = {{
            verticalAlign: 'middle',
            borderCollapse: 'separate',
            width: '100%',
            borderSpacing: '0px 5px',
            background: '#d8e2f7'
          }}
        >
        <tbody>
        {matchList.map((match, index)=>{
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
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
