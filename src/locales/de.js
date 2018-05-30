import React, { Component } from "react";
import de from "./de.json";
import "moment/locale/de";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("de");
  }
  render() {
    return this.props.children(de);
  }
}

export default LocaleLoader;
