import React, { Component } from "react";
import ja from "./ja.json";
import "moment/locale/ja";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("ja");
  }
  render() {
    return this.props.children(ja);
  }
}

export default LocaleLoader;
