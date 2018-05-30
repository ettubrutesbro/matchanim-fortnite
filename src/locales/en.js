import React, { Component } from "react";
import en from "./en.json";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("en");
  }
  render() {
    return this.props.children(en);
  }
}

export default LocaleLoader;
