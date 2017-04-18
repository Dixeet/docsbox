import React, {Component} from 'react';
import Layout from 'material-ui/Layout';
import styleStore from 'Stores/style';
import UndockedDrawer from './Drawer';
import SimpleMenu from './Menu';


const styles = {
  root: {
    backgroundColor: 'white',
  },
  douze: {
    backgroundColor: 'red',
  },
  six: {
    backgroundColor: 'yellow',
  },
};


const TestComponent = ({classes}) => {
  console.log(classes);
  return (
    <div>
      <Layout container className={classes.root} gutter={24}>
        <Layout className={classes.douze} item xs={12}>
          <div>xs 12</div>
        </Layout>
        <Layout
          className={styleStore.classNames(styleStore.globalClasses.purple, classes.six)}
          item sm={6}
        >
          <div>
            sm 6
          </div>
        </Layout>
        <Layout item xs={12}><UndockedDrawer /></Layout>
        <Layout item xs={12}><SimpleMenu /></Layout>
      </Layout>
    </div>
  );
};
// As Class
//
// class TestComponent extends Component {
//   // const classes = styleManager.render(styleSheet);
//   constructor(props) {
//     super(props);
//     // this.state = {date: styleStore.date};
//   }
//
//
//   render() {
//     console.log(styleStore.date);
//     return (
//       <div>
//         <Layout container className={this.props.classes.root} gutter={24}>
//           <Layout className={this.props.classes.douze} item xs={12}>
//             <div>xs 12</div>
//           </Layout>
//           <Layout className={this.props.classes.six} item xs={12} sm={6}>
//             <div>
//               sm 6
//             </div>
//           </Layout>
//           <Layout item xs={12}>
//             <FormattedDate date={this.state.date} />
//           </Layout>
//           <Layout><UndockedDrawer /></Layout>
//         </Layout>
//       </div>
//     );
//   }
//
// }

// const Toto = injectSheet(styles)(TestComponent);
// function tata(InnerComponent) {
//   return class Titi extends React.Component {
//     render() {
//       return <InnerComponent test={'titi'} {...this.props} />;
//     }
//   };
// }
// console.log(Tata);
// export default tata(Toto);
export default styleStore.injectSheet(styles)(TestComponent);
// export default TestComponent;

