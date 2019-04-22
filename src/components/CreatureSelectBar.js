import React, { Component } from "react";
import { CreatureSelector } from "./CreatureSelector";

export class CreatureSelectBar extends Component {
    render() {
        return (
            <div id="creatureSelectBar">
                {this.props.creatures.map((creat, key) => (
                    <CreatureSelector
                        id={creat.id}
                        creatureObj={creat.creatureObj}
                        key={key}
                        playerCreatureId={this.props.playerCreatureId}
                        onClick={() => this.props.toggleCreatureSelect(creat.id, creat.creatureObj)}
                    />
                ))}
            </div>
        );
    }
}
