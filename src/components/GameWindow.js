import React, { Component } from "react";
import { CREATS } from "../creatures";
import { CreatureSelectScreen } from "./CreatureSelectScreen";
import { FightWavesScreen } from "./FightWavesScreen";

// Component to contain the game happening inside the app
// GameWindow will handle most of the game state and game play
export class GameWindow extends Component {
    constructor(props) {
        super(props);
        this.creatures = CREATS;

        this.state = {
            phase: "startMenu",
            playerCreatureId: 1,
            creatureObj:  this.creatures[0].creatureObj
        };

        this.changeGamePhase = this.changeGamePhase.bind(this);
        this.startBtnClickHandler = this.startBtnClickHandler.bind(this);
        this.toggleCreatureSelect = this.toggleCreatureSelect.bind(this);
        
    }
    render() {
        switch (this.state.phase) {
            // shows the starting menu
            case "startMenu":
                return this.returnStartMenuRender();
            case "creatureSelect":
                return this.returnCreatureSelectRender();
            case "fightWavesScreen":
                return this.returnFightWavesRender();
            // default for no matches if something were to happen
            default:
                return (
                    <div>
                        <p>Nothing to display</p>
                    </div>
                );
        }
    }

    // changes the game phase
    changeGamePhase(stateName) {
        this.setState({
            phase: stateName
        });
    }

    // creates the starting menu render
    returnStartMenuRender() {
        return (
            <div id="gameWindow">
                <p className="startMenu title">Game Name or Something</p>
                <button
                    onClick={this.startBtnClickHandler}
                    className="startMenu mainBtn"
                >
                    Start
                </button>
                <button className="startMenu mainBtn">Help</button>
            </div>
        );
    }
    // creates the creature select render
    returnCreatureSelectRender() {
        return (
            <div id="gameWindow">
                <CreatureSelectScreen
                    creatureObj={this.state.creatureObj}
                    toggleCreatureSelect={this.toggleCreatureSelect}
                    playerCreatureId={this.state.playerCreatureId}
                    creatures={this.creatures}
                    changeGamePhase={this.changeGamePhase}
                />
            </div>
        );
    }

    returnFightWavesRender(){
        return(
            <div id="gameWindow">
                <FightWavesScreen 
                    changeGamePhase={this.changeGamePhase} 
                    playerCreature={this.state.creatureObj} 
                    creatures={this.creatures}
                />
            </div>
        )
    }

    
    // changes the state of playerCreatureId and creatureObj
    toggleCreatureSelect(id, creatureObj) {
        this.setState({
            playerCreatureId: id,
            creatureObj:  creatureObj
        });
    }

    // start button on start menu handler
    startBtnClickHandler() {
        this.changeGamePhase("creatureSelect");
    }
}
