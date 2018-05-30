import React, { Component } from "react";
import es from "./en.json";
import "moment/locale/es";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("es");
  }
  render() {
    return this.props.children(es);
  }
}

export default LocaleLoader;
