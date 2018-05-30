import React, { Component } from "react";
import tr from "./tr.json";
import "moment/locale/tr";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("tr");
  }
  render() {
    return this.props.children(tr);
  }
}

export default LocaleLoader;
