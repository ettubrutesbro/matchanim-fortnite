import React, { Component, createContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";
import LocaleComponent from "../locale";
import ReactSVG from "react-svg";
import { media } from "./responsive";
import { changeLanguageAndSetCookie } from "../actions/preferences";

const LocaleNav = styled.div`
  border: 1px solid #202020;
  border-width: 0 1px 0 1px;
  color: ${props => (props.isActive ? "#8F8F8F" : "#C2C2C2")};
  background: ${props => (props.isActive ? "#202020" : "#2a2a2a")};
  color: #e8e8e8;
  cursor: pointer;
  font-family: "Lato";
  font-size: 14px;
  font-weight: 400;
  position: relative;
  z-index: 30;
  display: block;
  float: left;
  padding: 6px 18px;
  text-align: center;
  &.language {
    ${media.tablet_wide`
      margin-left: 16px;
    `};
  }
  &:hover {
    background: #202020;
    div {
      display: flex;
    }
    span {
      opacity: 0.8;
    }
  }
  img {
    display: inline-block;
    fill: ${props => (props.isActive ? "#8F8F8F" : "#C2C2C2")};
    height: 10px;
    padding-right: 5px;
    stroke: ${props => (props.isActive ? "#8F8F8F" : "#C2C2C2")};
    margin: auto;
    width: 15px;
    &:hover {
      fill: #8f8f8f;
    }
  }
`;

LocaleNav.DisplayLink = styled.span`
  cursor: pointer;
  font-family: "Lato";
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-transform: capitalize;
  z-index: 20;
`;

LocaleNav.Dropdown = styled.div`
  display: none;
  line-height: 1;
  position: absolute;
  background: #f9f9f9;
  box-shadow: 0 50px 100px 0 rgba(50, 50, 93, 0.1),
    0 15px 35px 0 rgba(50, 50, 93, 0.15), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  top: 29px;
  overflow: hidden;
  z-index: 100;
  width: 150px;
  left: -30px;
`;
LocaleNav.Link = styled.a`
  display: block;
  padding: 10px 12px 10px 35px;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
  color: ${props => (props.isActive ? "#42B4FF" : "#363636")};
  cursor: pointer;
  text-align: left;
  position: relative;
  background: ${props => (props.isActive ? "#dedede" : "transparent")};
  text-transform: capitalize;
  &:hover {
    background: #dedede;
  }
`;
LocaleNav.CheckMark = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  height: 25px;
  width: 25px;
  padding-left: 35px;
  background: transparent;
  &:after {
    content: "";
    position: absolute;
    display: ${props => (props.isActive ? "block" : "none")};
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: ${props => (props.isActive ? "solid #42B4FF" : "transparent")};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

/**
 * Create a context
 */
const LocaleContext = createContext("es");

const languages = [
  { name: "English", code: "en" },
  { name: "français", code: "fr" },
  { name: "español", code: "es" },
  { name: "Português", code: "pt" },
  { name: "Nederlands", code: "nl" },
  { name: "中文", code: "zh" },
  { name: "polski", code: "pl" },
  { name: "Türkçe", code: "tr" },
  { name: "italiano", code: "it" },
  { name: "한국어", code: "ko" },
  { name: "日本語", code: "ja" },
  { name: "Deustche", code: "de" }
];

/**
 * Context consumer
 */
const { Consumer } = LocaleContext;

class LocaleManager extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.any
  };
  render() {
    const { language } = this.props;
    return (
      <LocaleContext.Provider value={language}>
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}

export class FlagLogo extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          return value == "en" ? (
            ""
          ) : (
            <img src={`../../../static/language/${value}.png`} className="flag" />
          );
        }}
      </Consumer>
    );
  }
}

export class LocaleText extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.any
  };
  render() {
    const { id, children } = this.props;
    if (typeof children === "function") {
      return (
        <Consumer>
          {value => {
            return (
              <LocaleComponent language={value}>
                {localeData => {
                  return children(localeData[id] || null);
                }}
              </LocaleComponent>
            );
          }}
        </Consumer>
      );
    } else {
      return (
        <Consumer>
          {value => {
            return (
              <LocaleComponent language={value}>
                {localeData => {
                  return localeData[id] || null;
                }}
              </LocaleComponent>
            );
          }}
        </Consumer>
      );
    }
  }
}

class _LocaleSelection extends Component {
  render() {
    const { language, changeLanguageAndSetCookie } = this.props;
    const currentLanguage = languages.find(
      languageIterator => languageIterator.code === language
    );
    return (
      <LocaleNav className="language">
        <LocaleNav.DisplayLink>
          <img src="../../../static/globe.png" />
          {get(currentLanguage, "name", "")}
        </LocaleNav.DisplayLink>
        <LocaleNav.Dropdown>
          {languages.map((languageIterator, index) => (
            <LocaleNav.Link
              key={index}
              onClick={() => changeLanguageAndSetCookie(languageIterator.code)}
              isActive={languageIterator === currentLanguage}
            >
              <LocaleNav.CheckMark
                isActive={languageIterator === currentLanguage}
              />
              {languageIterator.name}
            </LocaleNav.Link>
          ))}
        </LocaleNav.Dropdown>
      </LocaleNav>
    );
  }
}

export { Consumer };

export const LocaleSelection = connect(
  state => ({
    language: state.preferences.i18n
  }),
  {
    changeLanguageAndSetCookie
  }
)(_LocaleSelection);

export default connect(
  state => ({
    language: state.preferences.i18n
  }),
  {
    changeLanguageAndSetCookie
  }
)(LocaleManager);
