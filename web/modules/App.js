import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

export default App;
//
// export default class App extends React.Component {
//     render() {
//         return (
//             <div style={{textAlign: 'center'}}>
//                 <h1>Hello World 4 tata</h1>
//                 <span>HeyHey</span>
//             </div>);
//     }
// }
