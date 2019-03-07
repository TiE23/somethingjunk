import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Smiley from "./components/Smiley";
import CounterButton from "./components/CounterButton";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Smiley />
        <CounterButton />
      </div>
    );
  }
}

export default App;
