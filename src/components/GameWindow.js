import React, { Component } from "react";

// Component to contain the game happening inside the app
// GameWindow will handle most of the game state and game play
export class GameWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: "startMenu"
        };
    }
    render() {
        switch (this.state.phase) {
            // shows the starting menu
            case "startMenu":
                return this.returnStartMenuRender();
            case "creatureSelect":
                return;
            // default for no matches if something were to happen
            default:
                return (
                    <div>
                        <p>Nothing to display</p>
                    </div>
                );
        }
    }

    // creates the starting menu render
    returnStartMenuRender(){
        return (
            <div id="gameWindow">
                <p class="startMenu">Welcoming words</p>
                <button class="startMenu">Start</button>
                <button class="startMenu">Help</button>
            </div>
        );
    }
    // creates the creature select render
    returnCreatureSelectRender(){
        return (
            <div id="gameWindow">
                <p>Creature Select</p>
            </div>
        )
    }

}
