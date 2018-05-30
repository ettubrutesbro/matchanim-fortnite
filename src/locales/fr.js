import React, { Component } from "react";
import fr from "./fr.json";
import "moment/locale/fr";
import moment from "moment";

class LocaleLoader extends Component {
  constructor(props) {
    super(props);
    moment.locale("fr");
  }
  render() {
    return this.props.children(fr);
  }
}

export default LocaleLoader;
