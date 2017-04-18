import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import styleStore from 'Stores/style';

const styles = {
  root: {
    width: '100%',
    position: 'relative',
  },
  appBar: {
    position: 'relative !important',
  },
};

styleStore.addGlobalClasses({flex: {flex: 1}});

function Header(props) {
  return (
    <div className={props.classes.root}>
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <Text
            className={styleStore.globalClasses.flex}
            type="title"
            colorInherit
          >{props.title}</Text>
          <Button contrast>Manage</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default styleStore.injectSheet(styles)(Header);
