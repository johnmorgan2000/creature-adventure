import React, { Component } from "react";

// Component to display creature and information
export class CreatureSelectDisplay extends Component {
    render() {
        return (
            <div id="creatureSelectDisplay">
                <div className="creatureDisplayImgContainer">
                    <img
                        className="creatureDisplayImg"
                        src={this.props.creatureObj.imageSrc}
                        alt=""
                    />
                </div>
                <div className="creatureSelectDisplay infoContainer">
                    <p className="name">{this.props.creatureObj.name}</p>
                    <div>
                        <p>
                            Type:{" "}
                            {this.props.creatureObj.elementInformation.type}
                        </p>
                        <ul>
                            <li>
                                Strong Against:{" "}
                                {
                                    this.props.creatureObj.elementInformation
                                        .strongAgainst
                                }
                            </li>
                            <li>
                                Weak Against:{" "}
                                {
                                    this.props.creatureObj.elementInformation
                                        .weakAgainst
                                }
                            </li>
                        </ul>
                    </div>
                    <p>Max Health: {this.props.creatureObj.maxHealth}</p>
                    <p>Base Focus: {this.props.creatureObj.baseFocus}</p>
                    <p>Attack Strength: {this.props.creatureObj.attackDmg}</p>
                    <div>
                        <p>Leveling up: (per wave)</p>
                        <ul>
                            <li>
                                Max Health +
                                {this.props.creatureObj.levelUpValues.healthUp}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
