import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TemporaryDrawer from './Navigation'


class App extends Component {
  render() {
    return (
      <div className="App">
        <TemporaryDrawer></TemporaryDrawer>
      </div>
    );
  }
}

export default App;
