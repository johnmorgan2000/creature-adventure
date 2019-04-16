import React, { Component } from "react";

// Component to contain the game happening inside the app
// GameWindow will handle most of the game state and game play
export class GameWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phase: "startMenu"
        };
        
        this.changeGamePhase = this.changeGameState.bind(this);
        this.startBtnClickHandler = this.startBtnClickHandler.bind(this);
    }
    render() {
        switch (this.state.phase) {
            // shows the starting menu
            case "startMenu":
                return this.returnStartMenuRender();
            case "creatureSelect":
                return this.returnCreatureSelectRender();
            // default for no matches if something were to happen
            default:
                return (
                    <div>
                        <p>Nothing to display</p>
                    </div>
                );
        }
    }

    changeGamePhase(stateName){
        this.setState({
            phase: stateName
        })
    }

    // creates the starting menu render
    returnStartMenuRender(){
        return (
            <div id="gameWindow">
                <p className="startMenu">Welcoming words</p>
                <button 
                onClick={this.startBtnClickHandler}
                className="startMenu"
                >
                Start
                </button>
                <button className="startMenu">Help</button>
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

    startBtnClickHandler(){
        this.changeGamePhase("creatureSelect")
    }

}
