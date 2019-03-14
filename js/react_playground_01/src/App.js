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

export default App;
