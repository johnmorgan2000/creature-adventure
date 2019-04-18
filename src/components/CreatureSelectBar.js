import React, { Component } from "react";
import { CreatureSelector } from "./CreatureSelector";

export class CreatureSelectBar extends Component {

    render() {
        return (
            <div>
                {this.props.creatures.map((creat, key) => (
                    <CreatureSelector
                        id={creat.id}
                        key={key}
                        playerCreatureId={this.props.playerCreatureId}
                        onClick={() => this.props.toggleCreatureSelect(creat.id)}

                    />
                ))}
                {console.log(this.props.playerCreatureId)}
            </div>
        );
    }
}
