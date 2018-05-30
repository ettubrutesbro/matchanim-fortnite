import React, { Component } from "react";
import it from "./it.json";
import "moment/locale/it";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("it");
  }
  render() {
    return this.props.children(it);
  }
}

export default LocaleLoader;
