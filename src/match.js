import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, {keyframes} from "styled-components";
import FontAwesome from "react-fontawesome";
import numeral from "numeral";
// import {LocaleText} from './Locale'
import { media } from "./responsive";

import moment from 'moment'


function humanizeDuration(seconds) {
  if (seconds == "N/A") {
    return "N/A";
  } else {
    if (seconds.includes(",")) {
      var second = parseFloat(seconds.replace(/,/g, ""));
    } else {
      var second = parseInt(seconds, 10);
    }

    var days = Math.floor(second / (3600 * 24));
    second -= days * 3600 * 24;
    var hrs = Math.floor(second / 3600);
    second -= hrs * 3600;
    var mnts = Math.floor(second / 60);
    second -= mnts * 60;

    var formatSecond = `${second}s`;
    var formatDays = `${days}d `;
    var formatHrs = `${hrs}h `;
    var formatMnts = `${mnts}m `;

    if (second === 0) {
      formatSecond = "";
    }
    if (days === 0) {
      formatDays = "";
    }
    if (hrs === 0) {
      formatHrs = "";
    }
    if (mnts === 0) {
      formatMnts = "";
    }

    return formatDays + formatHrs + formatMnts + formatSecond;
  }
}
const YellowFade = keyframes`
  0% { background: #FFFAD6;}
  50% { background: #FFFAD6;}
  100% { background: #fafafa;}
`

const Tile = styled.tr`
  background: #fafafa;
  &.arrivedViaUpdate{
    animation: ${YellowFade} 4s forwards;
  }
  ${media.phone`
    height: 50px;
    td {
      margin-bottom: 3px;
      display: block;
      &:nth-child(1) {
        float: left;
        width: 100px;
        p {
          float: left;
          line-height: 26px;
          margin-left: 10px;
          width: 90px;
        }
      }
      &:nth-child(2) {
        float: left;
        line-height: 26px;
        width: 25% !important;
      }
      &:nth-child(3) {
        line-height: 29px;
        width: 10% !important;
      }
      &:nth-child(4) {
        float: left;
        line-height: 10px;
        margin-left: 10px;
        width: 80px !important;
      }
      &:nth-child(5) {
        float: left;
        line-height: 10px;
        margin-left: 11px;
        width: 25% !important;
      }
      &:nth-child(6) {
        float: left;
        line-height: 11px;
        width: 15% !important;
      }
      &:nth-child(7) {
        float: left;
        line-height: 11px;
        width: 20% !important;
      }
    }
  `} td {
    color: #708bb4;
    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    padding: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    div {
      font-weight: bold;
    }
    b {
      color: #355282;
      font-weight: bold;
      margin-left: 7px;
    }
    &:nth-child(2) {
      width: 20%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 12%;
    }
    &:nth-child(5) {
      width: 18%;
    }
    &:nth-child(6) {
      width: 15%;
    }
    &:nth-child(7) {
      width: 25%;
    }
  }
`;
const ResultWrap = styled.td`
  overflow: hidden;
  width: 135px;
`;
const Result = styled.p`
  float: left;
  font-size: 14px;
  font-weight: 800;
  height: 100%;
  margin: 0;
  line-height: 41px;
  overflow: hidden;
  padding-left: 9px;
  position: relative;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  width: 134px;
  ${media.tablet`
    font-size: 12px;
    margin-left: 10px;
    padding-left: 0px;
    white-space: nowrap;
    width: 90px;
    &.winner {
      background: none !important;
      color: #c579dc !important;
      overflow: unset !important;
    }
  `} &.matches {
    color: #355282;
  }
  &.top {
    color: #ed9f3b;
  }
  &.winner {
    background: #c579dc;
    color: #fafafa;
    max-width: 135px;
    overflow: hidden;
    padding-right: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: auto;
    &:after {
      background: #fafafa;
      content: "";
      position: absolute;
      top: 0;
      left: calc(100% + -1px);
      width: 100%;
      height: 100%;
      -webkit-transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      -webkit-transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: skew(12deg);
      -ms-transform: skew(12deg);
      -webkit-transform: skew(12deg);
      -ms-transform: skew(12deg);
      transform: skew(12deg);
    }
  }
  &.defeat {
    color: #355282;
  }
`;
const Time = styled.td``;
const PlatformWrap = styled.td``;
const Platform = styled.img``;
const Mode = styled.td`
  text-transform: uppercase;
`;
const Score = styled.td``;
const Kills = styled.td``;
const Alive = styled.td``;
const Wins = styled.td``;

const fakematch = { //for prototyping adding
    timestamp: moment(Date.now()),
    platform: 'pc',
    mode: 'solo',
    season: 'season-4',
    matchesPlayed: 1,
    '_result': '1 match',
    summary: {
        kills: Math.floor(Math.random()*15),
        score: Math.floor(Math.random()*1000),
        placetop1: 0,
        placetop10: 0,
        placetop25: 0,
        matchesPlayed: 0,
        minutesPlayed: null,
        timePlayed: 0,
        wins: 0,
        losses: 0
    }
}

class Match extends Component {
  static propTypes = {
    result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    time: PropTypes.any.isRequired,
    mode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    kills: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alive: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    wins: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  render() {
    const {
      result,
      platform,
      time,
      mode,
      score,
      kills,
      wins,
      alive
    } = this.props;

    /* let resultText = "";
    if (result.endsWith("matches")) {
      resultText = (
        <div id="matches">
          {value => result.match(/\d+/)[0] + " " + value}
        </div>
      );
    } else {
      resultText = <div id={result.replace(/\s/g, "")} />;
    }
    */
    const possibleFinishes = [
      'top 25 ', 'top 5 ', 'top 6 ', 'winner ', 'defeat '
    ]
    const mockResultClass = possibleFinishes[Math.floor(Math.random()*possibleFinishes.length)]
    const mockResultString = mockResultClass === 'top 25 '? 'TOP 25S':
      mockResultClass === 'top 5 '? 'TOP 5S':
      mockResultClass === 'top 6 '? 'TOP 6S':
      mockResultClass === 'winner '? 'WINNER':
      'DEFEAT'
  
    
    return (
      <Tile className={["match", this.props.isNew? 'arrivedViaUpdate' : ''].join(' ')}>
        <ResultWrap>
          <Result className={`${mockResultClass} result`}> {mockResultString} </Result>
        </ResultWrap>
        <Time>{time}</Time>
        <PlatformWrap>
          <Platform src={`/static/${platform}.svg`} />
        </PlatformWrap>
        <Mode className="mode">{mode}</Mode>
        <Score>
          <div id="score" />
          Score
          <b>
            {numeral(score)
              .format("+0,0")
              .toLocaleString()}
          </b>
        </Score>
        <Kills>
          <div id="kills" />
                    Kills
          <b>{numeral(kills).format("0,0")}</b>
        </Kills>
        <Wins>
          {numeral(wins).format("0,0") > 0 && result != "winner" ? (
            <div>
              <div id="wins" />
              <b>{numeral(wins).format("0,0")}</b>
            </div>
          ) : null}
        </Wins>
      </Tile>
    );
  }
}

export default Match;
