import React, { Component } from "react";
import ko from "./ko.json";
import "moment/locale/ko";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("ko");
  }
  render() {
    return this.props.children(ko);
  }
}

export default LocaleLoader;
