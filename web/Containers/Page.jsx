import React, {Component} from 'react';
import Layout from 'material-ui/Layout';
import styleStore from 'Stores/style';
import Header from './Header';
import Sidebar from './Sidebar';

const styles = {
  list: {
    marginLeft: styleStore.theme.sideBar.width,
  },
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Explore',
    };
  }

  render() {
    return (
      <div>
        <Layout container gutter={24}>
          <Layout className={this.props.classes.list} item xs>
            <Layout container>
              <Header title={this.state.title} />
            </Layout>
          </Layout>
        </Layout>
        <Sidebar>
          <span>Toto</span>
        </Sidebar>
      </div>
    );
  }
}

export default styleStore.injectSheet(styles)(Page);
