import React, { Component } from "react";
import nl from "./nl.json";
import "moment/locale/nl";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("nl");
  }
  render() {
    return this.props.children(nl);
  }
}

export default LocaleLoader;
