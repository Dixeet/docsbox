import React, {Component} from 'react';
import Layout from 'material-ui/Layout';
import styleStore from 'Stores/style';
import { grey, brown } from 'material-ui/styles/colors';

const styles = {
  body: {
    backgroundColor: brown[50],
    color: grey[700],
  },
};

function Body(props) {
  return (
    <Layout container justify="center" className={props.classes.body}>
      <Layout item sm={7} xs={12}>
        {props.children}
      </Layout>
    </Layout>
  );
}

export default styleStore.injectSheet(styles)(Body);
