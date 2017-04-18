import injectSheet from 'react-jss';
import jss from 'jss';
import classNames from 'classnames';

let theme = {
  fontFamily: 'Roboto',
  sideBar: {
    width: '250px',
  },
};

const globalSheet = jss.createStyleSheet();
globalSheet.attach();

const styleStore = {
  injectSheet,
  classNames,
  defineTheme,
  setInTheme,
  addGlobalClasses: globalSheet.addRules.bind(globalSheet),
  removeGlobalClass: globalSheet.deleteRule.bind(globalSheet),
  get globalClasses() {
    return Object.assign(globalSheet.classes);
  },
  get theme() {
    return getTheme();
  },
};

export default styleStore;

function defineTheme(obj) {
  if (typeof obj === 'object') {
    theme = Object.assign({}, obj);
  }
  return getTheme();
}

function setInTheme(obj) {
  if (typeof obj === 'object') {
    Object.assign(theme, obj);
  }
  return getTheme();
}

function getTheme() {
  return Object.assign({}, theme);
}

