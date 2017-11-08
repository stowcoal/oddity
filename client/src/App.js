import React, { Component } from 'react';
import './App.css';
import Main from './Main.js';
import Header from './Header.js';

class App extends Component {
  render() {
    console.log(this.props)
    return (

      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
