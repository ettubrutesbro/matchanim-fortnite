import React, { Component } from "react";
import dynamic from "next/dynamic";

// Next doesn't support dynamic imports with template literals as of now
// which is why the drastic repetition
// however this is necessary for bundle size optmisation on the frontend

const enLocaleComponent = dynamic(import("./locales/en"), {
  loading: () => null
});
const deLocaleComponent = dynamic(import("./locales/de"), {
  loading: () => null
});
const esLocaleComponent = dynamic(import("./locales/es"), {
  loading: () => null
});
const frLocaleComponent = dynamic(import("./locales/fr"), {
  loading: () => null
});
const itLocaleComponent = dynamic(import("./locales/it"), {
  loading: () => null
});
const jaLocaleComponent = dynamic(import("./locales/ja"), {
  loading: () => null
});
const koLocaleComponent = dynamic(import("./locales/ko"), {
  loading: () => null
});
const nlLocaleComponent = dynamic(import("./locales/nl"), {
  loading: () => null
});
const plLocaleComponent = dynamic(import("./locales/pl"), {
  loading: () => null
});
const ptLocaleComponent = dynamic(import("./locales/pt"), {
  loading: () => null
});
const trLocaleComponent = dynamic(import("./locales/tr"), {
  loading: () => null
});
const zhLocaleComponent = dynamic(import("./locales/zh"), {
  loading: () => null
});

function getComponent(language) {
  switch (language) {
    case "en":
      return enLocaleComponent;
    case "de":
      return deLocaleComponent;
    case "es":
      return esLocaleComponent;
    case "fr":
      return frLocaleComponent;
    case "it":
      return itLocaleComponent;
    case "ja":
      return jaLocaleComponent;
    case "ko":
      return koLocaleComponent;
    case "nl":
      return nlLocaleComponent;
    case "pl":
      return plLocaleComponent;
    case "pt":
      return ptLocaleComponent;
    case "tr":
      return trLocaleComponent;
    case "zh":
      return zhLocaleComponent;
    default:
      return enLocaleComponent;
  }
}

export default class LocaleComponent extends Component {
  render() {
    const { language, ...restProps } = this.props;
    const LocaleDataComponent = getComponent(language);
    return <LocaleDataComponent {...restProps} />;
  }
}
