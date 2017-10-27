import React, { Component } from 'react';
import './App.css';
import Main from './Main.js';
import Header from './Header.js';
import DocumentTitle from 'react-document-title';

class App extends Component {
  render() {
    return (

      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
