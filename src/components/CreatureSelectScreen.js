import React, { Component } from "react";
import {CreatureSelectBar} from "./CreatureSelectBar";

export class CreatureSelectScreen extends Component {

    render() {
        return (
            <div>
                <div>Selected Creature Container</div>
                <div>Creature Stats</div>
                <CreatureSelectBar 
                creatures={this.props.creatures} 
                playerCreatureId={this.props.playerCreatureId}
                toggleCreatureSelect={this.props.toggleCreatureSelect}/>
            </div>
        );
    }
}
