import React, { Component } from 'react';
import './App.css';
import ApiShooter from "./components/apishooter/ApiShooter";


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <ApiShooter />
        </div>
      </div>
    );
  }
}

// class App extends Component {
//   state = {
//     counter: 0
//   };
//
//   incrementCounter = () => {
//     this.setState({
//       counter: this.state.counter + 1
//     });
//   };
//
//   render() {
//     return (<div className="App">
//       <p>Counter: {this.state.counter}</p>
//       <button onClick={this.incrementCounter}>
//         Increment counter</button>
//     </div>);
//   }
// }

export default App;
