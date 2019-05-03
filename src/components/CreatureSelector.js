import React, { Component } from "react";

// the selected component in the CreatureSelect bar
export class CreatureSelector extends Component {
    render() {
        var className;
        if (this.props.playerCreatureId === this.props.id) {
            className = "creatureSelect active";
        } else {
            className = "creatureSelect";
        }
        return (
            <div className={className} onClick={this.props.onClick}>
                <img src={this.props.creatureObj.imageSrc} />
                <div className="activeCover">
                    <div className="activeCoin" />
                </div>
            </div>
        );
    }
}
