import React, { Component } from 'react';
import Layout from 'material-ui/Layout';
import styleStore from 'Stores/style';

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

export default FormattedDate;