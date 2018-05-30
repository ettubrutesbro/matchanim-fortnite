import React, { Component } from "react";
import zh from "./zh.json";
import "moment/locale/zh-cn";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("zh-cn");
  }
  render() {
    return this.props.children(zh);
  }
}

export default LocaleLoader;
