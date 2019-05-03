import React, { Component } from "react";
import { GameWindow } from "./GameWindow";

import "../css/App.css";

class App extends Component {
    render() {
        return (
            <div id="app">
                {/* <header>
          Application
        </header> */}

                <GameWindow />
            </div>
        );
    }
}

export default App;
