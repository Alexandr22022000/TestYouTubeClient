import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import ChanelData from './conteiners/ChanelData';
import Content from './conteiners/Content';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar/>
        <ChanelData/>
        <Content/>
      </div>
    );
  }
}

export default App;