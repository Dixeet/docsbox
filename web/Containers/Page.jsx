import React, {Component} from 'react';
import Layout from 'material-ui/Layout';
import styleStore from 'Stores/style';
import SimpleMenu from 'Components/Menu';
import Header from './Header';
import Sidebar from './Sidebar';
import Body from './Body';

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
              <Header title={this.state.title}/>
            </Layout>
            <Layout container>
              <Layout item xs={12}>
                <Body>
                  <SimpleMenu />
                </Body>
              </Layout>
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
