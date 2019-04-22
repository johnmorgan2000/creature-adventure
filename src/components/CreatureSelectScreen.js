import React, { Component } from "react";
import {CreatureSelectBar} from "./CreatureSelectBar";
import {CreatureSelectDisplay} from "./CreatureSelectDisplay";

export class CreatureSelectScreen extends Component {

    render() {
        return (
            <div id="creatureSelectScreen">
                
                <CreatureSelectDisplay
                creatureObj={this.props.creatureObj}
                />
                <CreatureSelectBar 
                creatures={this.props.creatures} 
                playerCreatureId={this.props.playerCreatureId}
                toggleCreatureSelect={this.props.toggleCreatureSelect}/>
            </div>
        );
    }
}
