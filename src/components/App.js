import React, { Component } from 'react';
import {GameWindow} from './GameWindow';

import '../css/App.css';

class App extends Component {


  render() {
    return (
      <div>
        <header>
          Application
        </header>

        <GameWindow />

      </div>
    );
  }
}

export default App;
