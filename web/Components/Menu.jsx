import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { Menu, MenuItem, } from 'material-ui/Menu';
import styleStore from 'Stores/style';

const styles = {
  root: {
    display: 'block',
  },
  clicked: {
    backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
  },
};

class SimpleMenuComponent extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  button = undefined;

  // handleClick = (event) =>
    // console.log(event.currentTarget.offsetHeight);
    // this.setState({ open: true, anchorEl: event.currentTarget })};
  handleClick = (event) => this.setState({ open: true, anchorEl: document.getElementById('test') });

  handleRequestClose = () => this.setState({ open: false });
  handleEnter = (event) => {
    window.toto = event.style;
    console.log(event.style);
    console.log(event.style.top);
    console.log(event);
  };

  render() {
    console.log(this.props.classes);
    console.log(this.props);
    return (
      <div className={this.props.classes.root}>
        <Button
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          className={styleStore.classNames({[this.props.classes.clicked]: this.state.open})}
        >
          Open Menu
        </Button>
        <div style={{height: '68px', backgroundColor: 'red', position: 'absolute'}} id="test"></div>
        <div>Test</div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
const SimpleMenu = styleStore.injectSheet(styles)(SimpleMenuComponent);
SimpleMenu.displayName = 'SimpleMenu';
export default SimpleMenu;