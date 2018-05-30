import React, { Component } from "react";
import pt from "./pt.json";
import "moment/locale/pt";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("pt");
  }
  render() {
    return this.props.children(pt);
  }
}

export default LocaleLoader;
