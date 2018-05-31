import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {MATCHES} from './mockMatches.js'
import Match from './match'
import moment from 'moment'

import FontAwesome from 'react-fontawesome'

import styled, {keyframes} from 'styled-components'

const Timer = styled.div`
  position: relative;
  background: #31476F;
  color: white;
  border: 1px solid black;
  padding: 5px 10px;
  margin-bottom: 100px;
  width: 220px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
`
const Notifications = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 220px;
  height: 25px;
  transform: translateY(-100%);
  overflow: hidden;
`

const NotificationInOut = keyframes`
  0% {transform: translateY(100%);}
  12.5% {transform: translateY(0);}
  87.5% {transform: translateY(0);}
  100% {transform: translateY(100%);}
`

const NewMatches = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  animation: ${NotificationInOut} 4s linear forwards;
  color: #31476F;
  background: white;
  display: flex;
  align-items: center;
  padding-left: 10px;
  justify-content: space-between;
  box-sizing: border-box;
`
const NoNewMatches = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  animation: ${NotificationInOut} 4s linear forwards;
  color: #31476F;
  background: white;
  box-sizing: border-box;
`
const IntervalText = styled.div`
  color: white;
  text-align: left;
  font-size: 16px;
  display: inline-flex;

`
const NextUpdatePrompt = styled.div`
  color: #95ACD5;
  text-align: left;
  font-size: 13px;
  margin-top: 2px;
  padding-left: 20px;
  display: inline-flex;
`

const NewMatchCheckBlock = styled.div`
  color: white;
  display: flex;
  background: #BE7FD4;
  align-items: center;
  justify-content: center;
  padding: 5px;
  height: 100%;
`


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      addMatches: [],
      showNewMatchNotification: false,
      showNoMatchNotification: false
    }
  }

  componentDidMount(){
    this.setIntervalUpdate()
  }

  setIntervalUpdate = () => {
    //warning: i don't have any code unsetting
    //this interval.
    setInterval(this.randomlyAddMatchOrNot, 10000)
  }

  randomlyAddMatchOrNot = () => {
    const rando = Math.random() > 0.5
    console.log('did update yield new match data?',rando)
    if(rando){ 
      this.setState({showNewMatchNotification: true}, this.addMatch)
    }
    else this.setState({showNoMatchNotification: true})
  }

  unsetNotifications = () => {
    this.setState({
      showNoMatchNotification: false,
      showNewMatchNotification: false
    })
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
    const {addMatches, showNewMatchNotification, showNoMatchNotification} = this.state
    // console.log(this.state.addMatches)
    const matchList = addMatches.length > 0? addMatches.concat(MATCHES) : MATCHES
    // const matchList = MATCHES.unshift(...addMatches)
    console.log(matchList)
    return (
      <div className="App">
        <Timer>
          <IntervalText> 

            <i class="fa fa-clock-o" aria-hidden="true" style = {{marginRight: '7px'}} />
            25 minutes 40 seconds 
          </IntervalText>
          <NextUpdatePrompt>
            NEXT UPDATE 
            <FontAwesome name = "question-circle" style = {{marginLeft: '5px'}}/>
          </NextUpdatePrompt>
          <Notifications>
            {showNoMatchNotification && 
              <NoNewMatches
                onAnimationEnd = {this.unsetNotifications}
              >
                Sowwy no new matches
              </NoNewMatches>
            }
            {showNewMatchNotification && 
              <NewMatches
                onAnimationEnd = {this.unsetNotifications}
              >
                
               ! Match Result Added
               <NewMatchCheckBlock>
                <FontAwesome name = "check" />
              </NewMatchCheckBlock>
              </NewMatches>
            }
          </Notifications>
        </Timer>
        {/*
        <div 
          style = {{background: 'black', color: 'white', padding: '15px'}}
          onClick = {this.addMatch}
        >
          add fake match btn
        </div>
        */}
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
        {matchList.slice(0,10).map((match, index)=>{
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
