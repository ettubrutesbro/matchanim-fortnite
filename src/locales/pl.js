import React, { Component } from "react";
import pl from "./pl.json";
import "moment/locale/pl";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("pl");
  }
  render() {
    return this.props.children(pl);
  }
}

export default LocaleLoader;
