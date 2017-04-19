import React from 'react';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import styleStore from 'Stores/style';
import { indigo, blueGrey } from 'material-ui/styles/colors';

const styles = {
  drawer: {
    borderRight: 'none !important',
  },
  list: {
    width: styleStore.theme.sideBar.width,
    flex: 'initial',
  },
  sideBar: {
    backgroundColor: blueGrey[50],
    height: '100%',
  },
  list1: {
    backgroundColor: indigo[400],
    color: 'white',
  },
  avatar: {
    marginRight: '30px',
  },
};


function SideBar(props) {
  return (
    <div>
      <Drawer paperClassName={props.classes.drawer} open docked elevation={35}>
        <div className={props.classes.sideBar}>
          <List className={props.classes.list} disablePadding>
            <ListItem className={props.classes.list1}>
              <Avatar
                alt="DocsBox"
                src="/static/android-chrome-192x192.png"
                className={props.classes.avatar}
              />
              <Text type="headline" component="h2" colorInherit>
                DocsBox
              </Text>
            </ListItem>
          </List>
          <List className={props.classes.list} disablePadding>
            {props.children}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default styleStore.injectSheet(styles)(SideBar);
